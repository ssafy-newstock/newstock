import LeftNews from '@components/LeftNews';
import styled from 'styled-components';

const CenterDiv = styled.div`
  display: flex;
  width: 1024px;
  padding: 20px;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  align-self: stretch;
  overflow: auto;
`;

const CenterTitleDiv = styled.div`
  display: flex;
  padding-top: 25px;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  align-self: stretch;
`;

const CenterTitle = styled.p`
  color: #000;
  font-family: Inter;
  font-size: 32px;
  font-style: normal;
  font-weight: 600;
  line-height: 30px;
`;

const FontStyle = styled.p`
  color: #828282;
  font-family: Inter;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 30px;
`;

const CenterMenu = styled.div`
  display: flex;
  padding: 5px 10px;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
`;

const CenterMenuLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 50px;
`;

const SelectDateDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const CenterHr = styled.hr`
  width: 984px;
  height: 3px;
  background: #000;
`;

const CenterContent = styled.div`
  display: flex;
  flex-direction: row;
  padding: 0px 2px;
  align-items: flex-start;
  gap: 24px;
  align-self: stretch;
  overflow: auto;
`;

const CenterContentProps = styled.div`
  display: flex;
  padding: 15px 10px;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
  border-radius: 20px;
  background: #f7f7f7;
`;

const CenterContentPropsTitle = styled.p`
  color: #000;
  text-align: center;
  font-family: Inter;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: 30px; /* 150% */
`;

const MyNewsPage = () => {
  return (
    <>
      <LeftNews />
      <CenterDiv>
        <CenterTitleDiv>
          <CenterTitle>저장한 뉴스</CenterTitle>
          <FontStyle>
            중요한 뉴스를 저장하고 관리하세요. 원하는 뉴스 그룹을 선택하고
            관리할 수 있어요.
          </FontStyle>
          <CenterMenu>
            <CenterMenuLeft>
              <FontStyle>조회기간</FontStyle>
              <SelectDateDiv>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M2 12C2 8.229 2 6.343 3.172 5.172C4.344 4.001 6.229 4 10 4H14C17.771 4 19.657 4 20.828 5.172C21.999 6.344 22 8.229 22 12V14C22 17.771 22 19.657 20.828 20.828C19.656 21.999 17.771 22 14 22H10C6.229 22 4.343 22 3.172 20.828C2.001 19.656 2 17.771 2 14V12Z"
                    stroke="#828282"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M7 4V2.5M17 4V2.5M2.5 9H21.5"
                    stroke="#828282"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M17.5 17C17.5 17.1326 17.4473 17.2598 17.3536 17.3536C17.2598 17.4473 17.1326 17.5 17 17.5C16.8674 17.5 16.7402 17.4473 16.6464 17.3536C16.5527 17.2598 16.5 17.1326 16.5 17C16.5 16.8674 16.5527 16.7402 16.6464 16.6464C16.7402 16.5527 16.8674 16.5 17 16.5C17.1326 16.5 17.2598 16.5527 17.3536 16.6464C17.4473 16.7402 17.5 16.8674 17.5 17ZM17.5 13C17.5 13.1326 17.4473 13.2598 17.3536 13.3536C17.2598 13.4473 17.1326 13.5 17 13.5C16.8674 13.5 16.7402 13.4473 16.6464 13.3536C16.5527 13.2598 16.5 13.1326 16.5 13C16.5 12.8674 16.5527 12.7402 16.6464 12.6464C16.7402 12.5527 16.8674 12.5 17 12.5C17.1326 12.5 17.2598 12.5527 17.3536 12.6464C17.4473 12.7402 17.5 12.8674 17.5 13ZM12.5 17C12.5 17.1326 12.4473 17.2598 12.3536 17.3536C12.2598 17.4473 12.1326 17.5 12 17.5C11.8674 17.5 11.7402 17.4473 11.6464 17.3536C11.5527 17.2598 11.5 17.1326 11.5 17C11.5 16.8674 11.5527 16.7402 11.6464 16.6464C11.7402 16.5527 11.8674 16.5 12 16.5C12.1326 16.5 12.2598 16.5527 12.3536 16.6464C12.4473 16.7402 12.5 16.8674 12.5 17ZM12.5 13C12.5 13.1326 12.4473 13.2598 12.3536 13.3536C12.2598 13.4473 12.1326 13.5 12 13.5C11.8674 13.5 11.7402 13.4473 11.6464 13.3536C11.5527 13.2598 11.5 13.1326 11.5 13C11.5 12.8674 11.5527 12.7402 11.6464 12.6464C11.7402 12.5527 11.8674 12.5 12 12.5C12.1326 12.5 12.2598 12.5527 12.3536 12.6464C12.4473 12.7402 12.5 12.8674 12.5 13ZM7.5 17C7.5 17.1326 7.44732 17.2598 7.35355 17.3536C7.25979 17.4473 7.13261 17.5 7 17.5C6.86739 17.5 6.74021 17.4473 6.64645 17.3536C6.55268 17.2598 6.5 17.1326 6.5 17C6.5 16.8674 6.55268 16.7402 6.64645 16.6464C6.74021 16.5527 6.86739 16.5 7 16.5C7.13261 16.5 7.25979 16.5527 7.35355 16.6464C7.44732 16.7402 7.5 16.8674 7.5 17ZM7.5 13C7.5 13.1326 7.44732 13.2598 7.35355 13.3536C7.25978 13.4473 7.13261 13.5 7 13.5C6.86739 13.5 6.74022 13.4473 6.64645 13.3536C6.55268 13.2598 6.5 13.1326 6.5 13C6.5 12.8674 6.55268 12.7402 6.64645 12.6464C6.74022 12.5527 6.86739 12.5 7 12.5C7.13261 12.5 7.25978 12.5527 7.35355 12.6464C7.44732 12.7402 7.5 12.8674 7.5 13Z"
                    fill="#E0E0E0"
                    stroke="#828282"
                  />
                </svg>
                <FontStyle>24.08.01 ~ 24.08.31</FontStyle>
              </SelectDateDiv>
            </CenterMenuLeft>
          </CenterMenu>
        </CenterTitleDiv>
        <CenterHr />
        <CenterContent>
          <CenterContentProps>
            <CenterContentPropsTitle>시황 뉴스</CenterContentPropsTitle>
          </CenterContentProps>
          <CenterContentProps>
            <CenterContentPropsTitle>종목 뉴스</CenterContentPropsTitle>
          </CenterContentProps>
          <CenterContentProps>
            <CenterContentPropsTitle>스크랩</CenterContentPropsTitle>
          </CenterContentProps>
        </CenterContent>
      </CenterDiv>
    </>
  );
};

export default MyNewsPage;
