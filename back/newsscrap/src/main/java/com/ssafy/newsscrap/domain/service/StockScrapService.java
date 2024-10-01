package com.ssafy.newsscrap.domain.service;

import com.ssafy.newsscrap.domain.entity.StockScrap;
import com.ssafy.newsscrap.domain.entity.dto.StockScrapDto;
import com.ssafy.newsscrap.domain.repository.StockScrapRepository;
import com.ssafy.newsscrap.global.exception.ScrapContentNotEmptyException;
import com.ssafy.newsscrap.global.exception.ScrapNotFoundException;
import com.ssafy.newsscrap.global.exception.ScrapPermissionException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class StockScrapService {
    private final StockScrapRepository stockScrapRepository;

    @Transactional
    public void writeScrap(Long memberId, StockScrapDto dto) {
        hasText(dto);

        StockScrap entity = StockScrap.of(dto, memberId);
        stockScrapRepository.save(entity);
    }


    @Transactional
    public void editScrap(Long memberId, Long scrapId, StockScrapDto dto) {
        StockScrap newsScrap = stockScrapRepository.findById(scrapId)
                .orElseThrow(ScrapNotFoundException::new);

        // 만약 작성자와 다른 토큰이면 에러
        if (memberId != newsScrap.getMemberId()) {
            throw new ScrapPermissionException();
        }

        // 본문이 비어있으면 오류
        hasText(dto);

        newsScrap.updateContent(dto);
    }

    @Transactional
    public void deleteScrap(Long memberId, Long scrapId) {
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
        PageRequest pageRequest = PageRequest.of(Math.max(page - 1, 0), size);

        List<StockScrap> content = stockScrapRepository
                .findAllByMemberIdAndCreatedDateBetween(memberId, startDate, endDate, pageRequest)
                .getContent();

        return content.stream()
                .map(StockScrapDto::of)
                .toList();
    }

    private static void hasText(final StockScrapDto dto) {
        if (!StringUtils.hasText(dto.getTitle()) || !StringUtils.hasText(dto.getContent())) {
            throw new ScrapContentNotEmptyException();
        }
    }


    public List<Long> getScrapInStockNewsIn(final List<StockScrapDto> myStockScraps) {
        return myStockScraps.stream()
                .map(StockScrapDto::getNewsId)
                .collect(Collectors.toList());
    }
}
