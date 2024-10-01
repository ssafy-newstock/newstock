package com.ssafy.news.domain.service;

import com.ssafy.news.domain.entity.dto.StockScrapDto;
import com.ssafy.news.domain.entity.scrap.StockScrap;
import com.ssafy.news.domain.repository.StockNewsRepository;
import com.ssafy.news.domain.repository.StockScrapRepository;
import com.ssafy.news.global.exception.ScrapContentNotEmptyException;
import com.ssafy.news.global.exception.ScrapNotFoundException;
import com.ssafy.news.global.exception.ScrapPermissionException;
import com.ssafy.news.global.util.TokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class StockScrapService {
    private final StockNewsRepository stockNewsRepository;
    private final StockScrapRepository stockScrapRepository;
    private final TokenProvider tokenProvider;

    @Transactional
    public void writeScrap(String token, StockScrapDto dto) {
        Long memberId = tokenProvider.getMemberId(token);

        if (StringUtils.hasText(dto.getTitle()) || StringUtils.hasText(dto.getContent())) {
            throw new ScrapContentNotEmptyException();
        }
        StockScrap entity = StockScrap.of(dto, memberId);
        stockScrapRepository.save(entity);
    }

    @Transactional
    public void editScrap(String token, Long scrapId, StockScrapDto dto) {
        Long memberId = tokenProvider.getMemberId(token);

        StockScrap newsScrap = stockScrapRepository.findById(scrapId)
                .orElseThrow(ScrapNotFoundException::new);

        // 만약 작성자와 다른 토큰이면 에러
        if (memberId != newsScrap.getMemberId()) {
            throw new ScrapPermissionException();
        }

        // 본문이 비어있으면 오류
        if (StringUtils.hasText(dto.getTitle()) || StringUtils.hasText(dto.getContent())) {
            throw new ScrapContentNotEmptyException();
        }

        newsScrap.updateContent(dto);
    }

    @Transactional
    public void deleteScrap(String token, Long scrapId) {
        Long memberId = tokenProvider.getMemberId(token);

        StockScrap newsScrap = stockScrapRepository.findById(scrapId)
                .orElseThrow(ScrapNotFoundException::new);

        // 만약 작성자와 다른 토큰이면 에러
        if (memberId != newsScrap.getMemberId()) {
            throw new ScrapPermissionException();
        }

        stockScrapRepository.deleteById(scrapId);
    }

    public StockScrapDto getScrap(final Long scrapId) {
        StockScrap newsScrap = stockScrapRepository.findById(scrapId)
                .orElseThrow(ScrapNotFoundException::new);

        return StockScrapDto.of(newsScrap);
    }

    public List<StockScrapDto> getMyStockScraps(Long memberId, int page, int size, LocalDate startDate, LocalDate endDate) {
        PageRequest pageRequest = PageRequest.of(page, size);

        List<StockScrap> content = stockScrapRepository
                .findAllByMemberIdAndCreatedDateBetween(memberId, startDate, endDate, pageRequest)
                .getContent();

        return content.stream()
                .map(StockScrapDto::of)
                .toList();
    }

}
