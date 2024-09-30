package com.ssafy.news.domain.service;

import com.ssafy.news.domain.entity.dto.IndustryScrapDto;
import com.ssafy.news.domain.entity.scrap.IndustryScrap;
import com.ssafy.news.domain.repository.IndustryNewsRepository;
import com.ssafy.news.domain.repository.IndustryScrapRepository;
import com.ssafy.news.global.exception.ScrapNotFoundException;
import com.ssafy.news.global.exception.ScrapPermissionException;
import com.ssafy.news.global.util.TokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
        IndustryScrap entity = IndustryScrap.of(dto, memberId);
        industryScrapRepository.save(entity);
    }

    @Transactional
    public void editScrap(String token, Long scrapId, IndustryScrapDto dto) {
        Long memberId = tokenProvider.getMemberId(token);

        IndustryScrap newsScrap = industryScrapRepository.findById(scrapId)
                .orElseThrow(ScrapNotFoundException::new);

        if (memberId != newsScrap.getMemberId()) {
            throw new ScrapPermissionException();
        }

        newsScrap.updateContent(dto);
    }

    @Transactional
    public void deleteScrap(String token, Long scrapId) {
        Long memberId = tokenProvider.getMemberId(token);

        IndustryScrap newsScrap = industryScrapRepository.findById(scrapId)
                .orElseThrow(ScrapNotFoundException::new);

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
