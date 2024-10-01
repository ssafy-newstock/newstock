package com.ssafy.news.domain.service;

import com.ssafy.news.domain.entity.dto.IndustryScrapDto;
import com.ssafy.news.domain.entity.scrap.IndustryScrap;
import com.ssafy.news.domain.repository.IndustryNewsRepository;
import com.ssafy.news.domain.repository.IndustryScrapRepository;
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
public class IndustryScrapService {
    private final IndustryNewsRepository industryNewsRepository;
    private final IndustryScrapRepository industryScrapRepository;
    private final TokenProvider tokenProvider;

    @Transactional
    public void writeScrap(String token, IndustryScrapDto dto) {
        Long memberId = tokenProvider.getMemberId(token);

        if (StringUtils.isEmpty(dto.getTitle()) || StringUtils.isEmpty(dto.getContent())) {
            throw new ScrapContentNotEmptyException();
        }
        IndustryScrap entity = IndustryScrap.of(dto, memberId);
        industryScrapRepository.save(entity);
    }

    @Transactional
    public void editScrap(String token, Long scrapId, IndustryScrapDto dto) {
        Long memberId = tokenProvider.getMemberId(token);

        IndustryScrap newsScrap = industryScrapRepository.findById(scrapId)
                .orElseThrow(ScrapNotFoundException::new);

        // 만약 작성자와 다른 토큰이면 에러
        if (memberId != newsScrap.getMemberId()) {
            throw new ScrapPermissionException();
        }

        // 본문이 비어있으면 오류
        if (StringUtils.isEmpty(dto.getTitle()) || StringUtils.isEmpty(dto.getContent())) {
            throw new ScrapContentNotEmptyException();
        }

        newsScrap.updateContent(dto);
    }

    @Transactional
    public void deleteScrap(String token, Long scrapId) {
        Long memberId = tokenProvider.getMemberId(token);

        IndustryScrap newsScrap = industryScrapRepository.findById(scrapId)
                .orElseThrow(ScrapNotFoundException::new);

        // 만약 작성자와 다른 토큰이면 에러
        if (memberId != newsScrap.getMemberId()) {
            throw new ScrapPermissionException();
        }

        industryScrapRepository.deleteById(scrapId);
    }

    public IndustryScrapDto getScrap(final Long scrapId) {
        IndustryScrap newsScrap = industryScrapRepository.findById(scrapId)
                .orElseThrow(ScrapNotFoundException::new);

        return IndustryScrapDto.of(newsScrap);
    }

    public List<IndustryScrapDto> getMyStockScraps(Long memberId, int page, int size, LocalDate startDate, LocalDate endDate) {
        PageRequest pageRequest = PageRequest.of(page, size);

        List<IndustryScrap> content = industryScrapRepository
                .findAllByMemberIdAndCreatedDateBetween(memberId, startDate, endDate, pageRequest)
                .getContent();

        return content.stream()
                .map(IndustryScrapDto::of)
                .toList();
    }

}
