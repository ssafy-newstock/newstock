package com.ssafy.stock.domain.service.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class StockPricesOutputKisResponseDto {

    @JsonProperty("iscd_stat_cls_code")
    private final String iscdStatClsCode;

    @JsonProperty("marg_rate")
    private final String margRate;

    @JsonProperty("rprs_mrkt_kor_name")
    private final String rprsMrktKorName;

    @JsonProperty("bstp_kor_isnm")
    private final String bstpKorIsnm;

    @JsonProperty("temp_stop_yn")
    private final String tempStopYn;

    @JsonProperty("oprc_rang_cont_yn")
    private final String oprcRangContYn;

    @JsonProperty("clpr_rang_cont_yn")
    private final String clprRangContYn;

    @JsonProperty("crdt_able_yn")
    private final String crdtAbleYn;

    @JsonProperty("grmn_rate_cls_code")
    private final String grmnRateClsCode;

    @JsonProperty("elw_pblc_yn")
    private final String elwPblcYn;

    @JsonProperty("stck_prpr")
    private final String stckPrpr;

    @JsonProperty("prdy_vrss")
    private final String prdyVrss;

    @JsonProperty("prdy_vrss_sign")
    private final String prdyVrssSign;

    @JsonProperty("prdy_ctrt")
    private final String prdyCtrt;

    @JsonProperty("acml_tr_pbmn")
    private final String acmlTrPbmn;

    @JsonProperty("acml_vol")
    private final String acmlVol;

    @JsonProperty("prdy_vrss_vol_rate")
    private final String prdyVrssVolRate;

    @JsonProperty("stck_oprc")
    private final String stckOprc;

    @JsonProperty("stck_hgpr")
    private final String stckHgpr;

    @JsonProperty("stck_lwpr")
    private final String stckLwpr;

    @JsonProperty("stck_mxpr")
    private final String stckMxpr;

    @JsonProperty("stck_llam")
    private final String stckLlam;

    @JsonProperty("stck_sdpr")
    private final String stckSdpr;

    @JsonProperty("wghn_avrg_stck_prc")
    private final String wghnAvrgStckPrc;

    @JsonProperty("hts_frgn_ehrt")
    private final String htsFrgnEhrt;

    @JsonProperty("frgn_ntby_qty")
    private final String frgnNtbyQty;

    @JsonProperty("pgtr_ntby_qty")
    private final String pgtrNtbyQty;

    @JsonProperty("pvt_scnd_dmrs_prc")
    private final String pvtScndDmrsPrc;

    @JsonProperty("pvt_frst_dmrs_prc")
    private final String pvtFrstDmrsPrc;

    @JsonProperty("pvt_pont_val")
    private final String pvtPontVal;

    @JsonProperty("pvt_frst_dmsp_prc")
    private final String pvtFrstDmspPrc;

    @JsonProperty("pvt_scnd_dmsp_prc")
    private final String pvtScndDmspPrc;

    @JsonProperty("dmrs_val")
    private final String dmrsVal;

    @JsonProperty("dmsp_val")
    private final String dmspVal;

    @JsonProperty("cpfn")
    private final String cpfn;

    @JsonProperty("rstc_wdth_prc")
    private final String rstcWdthPrc;

    @JsonProperty("stck_fcam")
    private final String stckFcam;

    @JsonProperty("stck_sspr")
    private final String stckSspr;

    @JsonProperty("aspr_unit")
    private final String asprUnit;

    @JsonProperty("hts_deal_qty_unit_val")
    private final String htsDealQtyUnitVal;

    @JsonProperty("lstn_stcn")
    private final String lstnStcn;

    @JsonProperty("hts_avls")
    private final String htsAvls;

    @JsonProperty("per")
    private final String per;

    @JsonProperty("pbr")
    private final String pbr;

    @JsonProperty("stac_month")
    private final String stacMonth;

    @JsonProperty("vol_tnrt")
    private final String volTnrt;

    @JsonProperty("eps")
    private final String eps;

    @JsonProperty("bps")
    private final String bps;

    @JsonProperty("d250_hgpr")
    private final String d250Hgpr;

    @JsonProperty("d250_hgpr_date")
    private final String d250HgprDate;

    @JsonProperty("d250_hgpr_vrss_prpr_rate")
    private final String d250HgprVrssPrprRate;

    @JsonProperty("d250_lwpr")
    private final String d250Lwpr;

    @JsonProperty("d250_lwpr_date")
    private final String d250LwprDate;

    @JsonProperty("d250_lwpr_vrss_prpr_rate")
    private final String d250LwprVrssPrprRate;

    @JsonProperty("stck_dryy_hgpr")
    private final String stckDryyHgpr;

    @JsonProperty("dryy_hgpr_vrss_prpr_rate")
    private final String dryyHgprVrssPrprRate;

    @JsonProperty("dryy_hgpr_date")
    private final String dryyHgprDate;

    @JsonProperty("stck_dryy_lwpr")
    private final String stckDryyLwpr;

    @JsonProperty("dryy_lwpr_vrss_prpr_rate")
    private final String dryyLwprVrssPrprRate;

    @JsonProperty("dryy_lwpr_date")
    private final String dryyLwprDate;

    @JsonProperty("w52_hgpr")
    private final String w52Hgpr;

    @JsonProperty("w52_hgpr_vrss_prpr_ctrt")
    private final String w52HgprVrssPrprCtrt;

    @JsonProperty("w52_hgpr_date")
    private final String w52HgprDate;

    @JsonProperty("w52_lwpr")
    private final String w52Lwpr;

    @JsonProperty("w52_lwpr_vrss_prpr_ctrt")
    private final String w52LwprVrssPrprCtrt;

    @JsonProperty("w52_lwpr_date")
    private final String w52LwprDate;

    @JsonProperty("whol_loan_rmnd_rate")
    private final String wholLoanRmndRate;

    @JsonProperty("ssts_yn")
    private final String sstsYn;

    @JsonProperty("stck_shrn_iscd")
    private final String stckShrnIscd;

    @JsonProperty("fcam_cnnm")
    private final String fcamCnnm;

    @JsonProperty("cpfn_cnnm")
    private final String cpfnCnnm;

    @JsonProperty("frgn_hldn_qty")
    private final String frgnHldnQty;

    @JsonProperty("vi_cls_code")
    private final String viClsCode;

    @JsonProperty("ovtm_vi_cls_code")
    private final String ovtmViClsCode;

    @JsonProperty("last_ssts_cntg_qty")
    private final String lastSstsCntgQty;

    @JsonProperty("invt_caful_yn")
    private final String invtCafulYn;

    @JsonProperty("mrkt_warn_cls_code")
    private final String mrktWarnClsCode;

    @JsonProperty("short_over_yn")
    private final String shortOverYn;

    @JsonProperty("sltr_yn")
    private final String sltrYn;
}
