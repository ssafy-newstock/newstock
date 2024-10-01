package com.ssafy.news.domain.service;

import com.ssafy.news.domain.entity.dto.StockNewsDto;
import com.ssafy.news.domain.entity.dto.StockScrapDto;
import com.ssafy.news.domain.entity.scrap.StockScrap;
import com.ssafy.news.domain.entity.stock.StockKeyword;
import com.ssafy.news.domain.entity.stock.StockNews;
import com.ssafy.news.domain.entity.stock.StockNewsStockCode;
import com.ssafy.news.domain.repository.StockNewsRepository;
import com.ssafy.news.domain.repository.StockScrapRepository;
import com.ssafy.news.domain.service.converter.NewsConverter;
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
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class StockScrapService {
    private final StockNewsRepository stockNewsRepository;
    private final StockScrapRepository stockScrapRepository;
    private final TokenProvider tokenProvider;

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

    public List<StockNewsDto> getStockNewsInIds(final List<Long> scrapInStockNewsIds) {
        List<StockNews> industryNewsByIdIn = stockNewsRepository.findAllByIdIn(scrapInStockNewsIds);

        return industryNewsByIdIn.stream()
                        .map(stockNews -> {
                            Set<StockNewsStockCode> entityStockCodes = stockNews.getStockNewsStockCodes();
                            Set<StockKeyword> entityKeywords = stockNews.getStockKeywords();

                            List<String> stockCodes = NewsConverter.convertStockCodeToDto(entityStockCodes);
                            List<String> keywords = NewsConverter.convertKeywordToDto(entityKeywords);

                            return StockNewsDto.of(stockNews, stockCodes, keywords);
                        })
                .collect(Collectors.toList());
    }
}
