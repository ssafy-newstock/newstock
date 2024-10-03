import {
  CenterContentDiv,
  MetricsContainer,
  CenterContentBottomDiv,
  MetricItemSkeleton,
} from '@features/MyStock/myStockCenterStyledComponent';
import SkeletonChart from './SkeletonChart';

const MyStockSkeletonCenter = () => {
  return (
    <CenterContentDiv>
      <CenterContentBottomDiv>
        <MetricsContainer>
          {Array.from({ length: 4 }).map((_, index) => (
            <MetricItemSkeleton key={index}/>
          ))}
        </MetricsContainer>

        {/* skeleton 도넛 차트 * 2 */}
        <SkeletonChart />
        <SkeletonChart />
      </CenterContentBottomDiv>
    </CenterContentDiv>
  );
};

export default MyStockSkeletonCenter;
