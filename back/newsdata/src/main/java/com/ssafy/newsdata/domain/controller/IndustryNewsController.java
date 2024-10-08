package com.ssafy.newsdata.domain.controller;


import com.ssafy.newsdata.domain.entity.dto.IndustryNewsDto;
import com.ssafy.newsdata.domain.service.IndustryNewsService;
import com.ssafy.newsdata.global.common.CommonResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLException;
import java.util.List;

@RestController
@RequestMapping("/api/newsdata/industry")
@RequiredArgsConstructor
public class IndustryNewsController {
    private final IndustryNewsService industryNewsService;

    @GetMapping("/top4")
    public CommonResponse<?> getTop4() throws SQLException, ClassNotFoundException {
        List<IndustryNewsDto> industryNewsPreviewDtos = industryNewsService.getRecentIndustryNewsTop4();

        return CommonResponse.success(industryNewsPreviewDtos);
    }

    @GetMapping()
    public CommonResponse<?> getIndustryNews(
            @RequestParam(value = "industry", required = false) String industry,
            @RequestParam(value = "lastSeenId", defaultValue = "") String lastSeenId,
            @RequestParam(value = "size", defaultValue = "10") int size) throws Exception {

        List<IndustryNewsDto> industryNewsPreviewDtos = industryNewsService.getIndustryNewsPreviews(industry, lastSeenId, size);

        return CommonResponse.success(industryNewsPreviewDtos);
    }

    @GetMapping("/{id}")
    public CommonResponse<?> getIndustryNewsById(@PathVariable("id") String id) throws SQLException, ClassNotFoundException {
        IndustryNewsDto industryNews = industryNewsService.getIndustryNews(id);

        return CommonResponse.success(industryNews);
    }

    @GetMapping("/{id}/read")
    public ResponseEntity<?> checkReadIndustryNews(@PathVariable("id") Long id,
                                                   @RequestHeader(value = "authorization", required = false) String token) {
        industryNewsService.checkReadIndustryNews(id, token);

        return ResponseEntity.noContent()
                .build();
    }

    @GetMapping("/bulk")
    public CommonResponse<?> getIndustryNewsInIds(@RequestParam List<String> ids) throws SQLException, ClassNotFoundException {
        List<IndustryNewsDto> industryNewsInIds = industryNewsService.getIndustryNewsInIds(ids);
        return CommonResponse.success(industryNewsInIds);
    }

    @GetMapping("/recent")
    public CommonResponse<?> getRecentIndustryNews() throws SQLException, ClassNotFoundException {
        List<IndustryNewsDto> recentIndustryNews = industryNewsService.getRecentIndustryNews();
        return CommonResponse.success(recentIndustryNews);
    }
}
