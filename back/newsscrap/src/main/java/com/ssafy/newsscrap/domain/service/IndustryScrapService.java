package com.ssafy.newsscrap.domain.service;

import com.ssafy.newsscrap.domain.entity.IndustryScrap;
import com.ssafy.newsscrap.domain.entity.dto.IndustryScrapDto;
import com.ssafy.newsscrap.domain.repository.IndustryScrapRepository;
import com.ssafy.newsscrap.global.common.TokenProvider;
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
public class IndustryScrapService {
    private final IndustryScrapRepository industryScrapRepository;

    @Transactional
    public void writeScrap(Long memberId, IndustryScrapDto dto) {

        hasText(dto);
        IndustryScrap entity = IndustryScrap.of(dto, memberId);
        industryScrapRepository.save(entity);
    }

    @Transactional
    public void editScrap(Long memberId, Long scrapId, IndustryScrapDto dto) {
        IndustryScrap newsScrap = industryScrapRepository.findById(scrapId)
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

    public List<IndustryScrapDto> getMyIndustryScraps(Long memberId, int page, int size, LocalDate startDate, LocalDate endDate) {
        PageRequest pageRequest = PageRequest.of(Math.max(page - 1, 0), size);

        List<IndustryScrap> content = industryScrapRepository
                .findAllByMemberIdAndCreatedDateBetween(memberId, startDate, endDate, pageRequest)
                .getContent();

        return content.stream()
                .map(IndustryScrapDto::of)
                .toList();
    }

    public List<Long> getScrapInIndustryNewsIn(List<IndustryScrapDto> scrapDtos) {
        return scrapDtos.stream()
                .map(IndustryScrapDto::getNewsId)
                .collect(Collectors.toList());
    }

    private static void hasText(final IndustryScrapDto dto) {
        if (!StringUtils.hasText(dto.getTitle()) || !StringUtils.hasText(dto.getContent())) {
            throw new ScrapContentNotEmptyException();
        }
    }
}