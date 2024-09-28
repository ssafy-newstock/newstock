import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

interface Data {
  rate: string;
  price: number;
  volume: string;
  amount: string;
}

function createData(
  rate: string,
  price: number,
  volume: string,
  amount: string
): Data {
  return { rate, price, volume, amount };
}

const rows = [createData('+ 1.11 %', 2687.08, '92,740천주', '2,968,900백만')];

// 스타일 정의: 테두리와 배경색을 포함
const StyledTableCell = styled(TableCell)({
  backgroundColor: '#f0f0f0', // 머리칸 배경색 지정
  fontWeight: 'bold', // 머리칸 글씨를 굵게
  textAlign: 'center', // 글씨 중앙 정렬
  border: '1px solid #ddd', // 테두리 추가
});

const StyledTableRow = styled(TableRow)({
  '& td, & th': {
    border: '1px solid #ddd', // 테두리 추가
    textAlign: 'center', // 중앙 정렬
  },
});

const StockTable: React.FC = () => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <StyledTableRow>
            <StyledTableCell>등락률</StyledTableCell>
            <StyledTableCell>종가</StyledTableCell>
            <StyledTableCell>거래량</StyledTableCell>
            <StyledTableCell>대금</StyledTableCell>
          </StyledTableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.rate}>
              <TableCell align="center" style={{ color: 'red' }}>
                {row.rate}
              </TableCell>
              <TableCell align="center">{row.price}</TableCell>
              <TableCell align="center">{row.volume}</TableCell>
              <TableCell align="center">{row.amount}</TableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default StockTable;
