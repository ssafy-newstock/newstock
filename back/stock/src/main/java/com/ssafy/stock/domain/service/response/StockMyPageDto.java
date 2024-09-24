package com.ssafy.stock.domain.service.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class StockMyPageDto {
    List<StockMyPageHoldingDto> stockMyPageHoldingDtoList;
    List<StockMyPageTransactionDto> stockMyPageTransactionDtoList;
    List<StockFavoriteDto> stockFavoriteDtoList;
}
