import useAuthStore from '@store/useAuthStore';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Login from './Login';

const LeftDiv = styled.div`
  display: flex;
  min-width: 180px;
  padding: 20px;
  flex-direction: column;
  align-items: flex-start;
  align-self: stretch;
`;

const MenuSection = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 10px;
  gap: 10px;
`;
const MenuSectionG = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
`;
const MenuSectionGG = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 2px;
`;
const TextDiv = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 3px;
`;

const TextTitle = styled.p`
  color: ${({ theme }) => theme.textColor};
  font-size: 16px;
  font-weight: 600;
  line-height: 30px;
`;

const TextP = styled.p`
  font-size: 14px;
  line-height: 30px;
`;

const StockFrame = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 25px;
  height: 25px;
  border: 2px solid ${({ theme }) => theme.textColor};
  flex-shrink: 0;
  cursor: pointer;
`;

const DropdownMenu = styled.div<{ isOpen: boolean; maxHeight: number }>`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  max-height: ${({ isOpen, maxHeight }) => (isOpen ? `${maxHeight}px` : '0')};
  transition: max-height 0.5s ease;
  margin-bottom: 10px;
  margin-left: 3px;
`;

const Left: React.FC = () => {
  const navigate = useNavigate();
  const [stockDropdown, setStockDropdown] = useState(false);
  const [newsDropdown, setNewsDropdown] = useState(false);
  const stockDropdownRef = useRef<HTMLDivElement>(null);
  const newsDropdownRef = useRef<HTMLDivElement>(null);
  const [stockDropdownHeight, setStockDropdownHeight] = useState(0);
  const [newsDropdownHeight, setNewsDropdownHeight] = useState(0);
  const { isLogin } = useAuthStore();
  const [loginOpen, setLoginOpen] = useState(false);

  const openLogin = () => {
    setLoginOpen(true);
  };

  // 로그인 모달 닫기
  const closeLogin = () => {
    setLoginOpen(false);
  };
  const handleProtectedClick = (path: string) => {
    if (isLogin) {
      navigate(path);
    } else {
      openLogin(); // 로그인되지 않은 상태일 경우 로그인 모달 열기
    }
  };
  useEffect(() => {
    if (stockDropdownRef.current) {
      setStockDropdownHeight(stockDropdownRef.current.scrollHeight);
    }
    if (newsDropdownRef.current) {
      setNewsDropdownHeight(newsDropdownRef.current.scrollHeight);
    }
  }, []);
  return (
    <LeftDiv>
      <MenuSection onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="25"
          height="25"
          viewBox="0 0 40 40"
          fill="none"
        >
          <path
            d="M36.0246 15.9997C36.0246 15.4693 35.8139 14.9606 35.4388 14.5855C35.0637 14.2104 34.555 13.9997 34.0246 13.9997C33.4941 13.9997 32.9854 14.2104 32.6104 14.5855C32.2353 14.9606 32.0246 15.4693 32.0246 15.9997H36.0246ZM8.02458 15.9997C8.02458 15.4693 7.81386 14.9606 7.43879 14.5855C7.06372 14.2104 6.55501 13.9997 6.02458 13.9997C5.49414 13.9997 4.98544 14.2104 4.61036 14.5855C4.23529 14.9606 4.02458 15.4693 4.02458 15.9997H8.02458ZM36.6106 21.4138C36.9878 21.7781 37.493 21.9797 38.0174 21.9752C38.5418 21.9706 39.0434 21.7603 39.4142 21.3894C39.785 21.0186 39.9954 20.517 39.9999 19.9926C40.0045 19.4682 39.8029 18.963 39.4386 18.5858L36.6106 21.4138ZM20.0246 1.99959L21.4386 0.585579C21.0635 0.210633 20.5549 0 20.0246 0C19.4942 0 18.9856 0.210633 18.6106 0.585579L20.0246 1.99959ZM0.610576 18.5858C0.419556 18.7703 0.267192 18.991 0.162374 19.235C0.0575557 19.479 0.00238315 19.7414 7.55134e-05 20.007C-0.00223212 20.2725 0.0483713 20.5359 0.148933 20.7817C0.249495 21.0275 0.398001 21.2508 0.585786 21.4386C0.773572 21.6264 0.996875 21.7749 1.24267 21.8755C1.48846 21.976 1.75182 22.0266 2.01738 22.0243C2.28294 22.022 2.54538 21.9668 2.78939 21.862C3.03339 21.7572 3.25408 21.6048 3.43858 21.4138L0.610576 18.5858ZM10.0246 40H30.0246V36H10.0246V40ZM36.0246 33.9999V15.9997H32.0246V33.9999H36.0246ZM8.02458 33.9999V15.9997H4.02458V33.9999H8.02458ZM39.4386 18.5858L21.4386 0.585579L18.6106 3.41361L36.6106 21.4138L39.4386 18.5858ZM18.6106 0.585579L0.610576 18.5858L3.43858 21.4138L21.4386 3.41361L18.6106 0.585579ZM30.0246 40C31.6159 40 33.142 39.3679 34.2672 38.2426C35.3924 37.1174 36.0246 35.5913 36.0246 33.9999H32.0246C32.0246 34.5304 31.8139 35.0391 31.4388 35.4142C31.0637 35.7892 30.555 36 30.0246 36V40ZM10.0246 36C9.49414 36 8.98543 35.7892 8.61036 35.4142C8.23529 35.0391 8.02458 34.5304 8.02458 33.9999H4.02458C4.02458 35.5913 4.65672 37.1174 5.78194 38.2426C6.90715 39.3679 8.43328 40 10.0246 40V36Z"
            fill="currentColor"
          />
        </svg>
        <TextTitle>홈</TextTitle>
      </MenuSection>
      <MenuSectionG
        onClick={() => setStockDropdown(!stockDropdown)}
        style={{ cursor: 'pointer' }}
      >
        <StockFrame>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="10"
            viewBox="0 0 37 18"
            fill="none"
          >
            <path
              d="M35.3333 2L21.4444 15.8889L10.3333 4.77778L2 13.1111"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </StockFrame>
        <MenuSectionGG>
          <TextTitle>주식</TextTitle>
          {!stockDropdown && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1rem"
              height="1rem"
              viewBox="0 0 24 24"
            >
              <g fill="none" fillRule="evenodd">
                <path d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.019-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" />
                <path
                  fill="currentColor"
                  d="M13.06 16.06a1.5 1.5 0 0 1-2.12 0l-5.658-5.656a1.5 1.5 0 1 1 2.122-2.121L12 12.879l4.596-4.596a1.5 1.5 0 0 1 2.122 2.12l-5.657 5.658Z"
                />
              </g>
            </svg>
          )}
          {stockDropdown && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1rem"
              height="1rem"
              viewBox="0 0 24 24"
            >
              <g fill="none" fillRule="evenodd">
                <path d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.019-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" />
                <path
                  fill="currentColor"
                  d="M10.94 7.94a1.5 1.5 0 0 1 2.12 0l5.658 5.656a1.5 1.5 0 1 1-2.122 2.121L12 11.122l-4.596 4.596a1.5 1.5 0 1 1-2.122-2.12z"
                />
              </g>
            </svg>
          )}
        </MenuSectionGG>
      </MenuSectionG>
      <DropdownMenu
        isOpen={stockDropdown}
        maxHeight={stockDropdownHeight}
        ref={stockDropdownRef}
      >
        <TextDiv
          onClick={() => navigate('/stock-main')}
          style={{ cursor: 'pointer' }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M6 19H9V13H15V19H18V10L12 5.5L6 10V19ZM4 21V9L12 3L20 9V21H13V15H11V21H4Z"
              fill="currentColor"
            />
          </svg>
          <TextP>주식 메인</TextP>
        </TextDiv>
        <TextDiv
          onClick={() => navigate('/all-stock')}
          style={{ cursor: 'pointer' }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M8 2C8.24493 2.00003 8.48134 2.08996 8.66437 2.25272C8.84741 2.41547 8.96434 2.63975 8.993 2.883L9 3V5C9.76521 4.99996 10.5015 5.29233 11.0583 5.81728C11.615 6.34224 11.9501 7.06011 11.995 7.824L12 8V14C12 14.7652 11.7077 15.5015 11.1827 16.0583C10.6578 16.615 9.93989 16.9501 9.176 16.995L9 17V21C8.99972 21.2549 8.90212 21.5 8.72715 21.6854C8.55218 21.8707 8.31305 21.9822 8.05861 21.9972C7.80416 22.0121 7.55362 21.9293 7.35817 21.7657C7.16271 21.6021 7.0371 21.3701 7.007 21.117L7 21V17C6.23479 17 5.49849 16.7077 4.94174 16.1827C4.38499 15.6578 4.04989 14.9399 4.005 14.176L4 14V8C3.99996 7.23479 4.29233 6.49849 4.81728 5.94174C5.34224 5.38499 6.06011 5.04989 6.824 5.005L7 5V3C7 2.73478 7.10536 2.48043 7.29289 2.29289C7.48043 2.10536 7.73478 2 8 2ZM17 2C17.2449 2.00003 17.4813 2.08996 17.6644 2.25272C17.8474 2.41547 17.9643 2.63975 17.993 2.883L18 3V7C18.7652 6.99996 19.5015 7.29233 20.0583 7.81728C20.615 8.34224 20.9501 9.06011 20.995 9.824L21 10V16C21 16.7652 20.7077 17.5015 20.1827 18.0583C19.6578 18.615 18.9399 18.9501 18.176 18.995L18 19V21C17.9997 21.2549 17.9021 21.5 17.7272 21.6854C17.5522 21.8707 17.313 21.9822 17.0586 21.9972C16.8042 22.0121 16.5536 21.9293 16.3582 21.7657C16.1627 21.6021 16.0371 21.3701 16.007 21.117L16 21V19C15.2348 19 14.4985 18.7077 13.9417 18.1827C13.385 17.6578 13.0499 16.9399 13.005 16.176L13 16V10C13 9.23479 13.2923 8.49849 13.8173 7.94174C14.3422 7.38499 15.0601 7.04989 15.824 7.005L16 7V3C16 2.73478 16.1054 2.48043 16.2929 2.29289C16.4804 2.10536 16.7348 2 17 2ZM18 9H16C15.7551 9.00003 15.5187 9.08996 15.3356 9.25272C15.1526 9.41547 15.0357 9.63975 15.007 9.883L15 10V16C15 16.2449 15.09 16.4813 15.2527 16.6644C15.4155 16.8474 15.6397 16.9643 15.883 16.993L16 17H18C18.2449 17 18.4813 16.91 18.6644 16.7473C18.8474 16.5845 18.9643 16.3603 18.993 16.117L19 16V10C19 9.75507 18.91 9.51866 18.7473 9.33563C18.5845 9.15259 18.3603 9.03566 18.117 9.007L18 9ZM9 7H7C6.75507 7.00003 6.51866 7.08996 6.33563 7.25272C6.15259 7.41547 6.03566 7.63975 6.007 7.883L6 8V14C6.00003 14.2449 6.08996 14.4813 6.25272 14.6644C6.41547 14.8474 6.63975 14.9643 6.883 14.993L7 15H9C9.24493 15 9.48134 14.91 9.66437 14.7473C9.84741 14.5845 9.96434 14.3603 9.993 14.117L10 14V8C9.99997 7.75507 9.91004 7.51866 9.74728 7.33563C9.58453 7.15259 9.36025 7.03566 9.117 7.007L9 7Z"
              fill="currentColor"
            />
          </svg>
          <TextP>전체 종목</TextP>
        </TextDiv>
        <TextDiv
          onClick={() => navigate('/section-stock')}
          style={{ cursor: 'pointer' }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M21 2H3C2.73478 2 2.48043 2.10536 2.29289 2.29289C2.10536 2.48043 2 2.73478 2 3V21C2 21.2652 2.10536 21.5196 2.29289 21.7071C2.48043 21.8946 2.73478 22 3 22H21C21.2652 22 21.5196 21.8946 21.7071 21.7071C21.8946 21.5196 22 21.2652 22 21V3C22 2.73478 21.8946 2.48043 21.7071 2.29289C21.5196 2.10536 21.2652 2 21 2ZM8 20H4V10H8V20ZM14 20H10V10H14V20ZM20 20H16V10H20V20ZM20 8H4V4H20V8Z"
              fill="currentColor"
            />
          </svg>
          <TextP>분야별 주식</TextP>
        </TextDiv>
        <TextDiv
          onClick={() => handleProtectedClick('/my-stock')}
          style={{ cursor: 'pointer' }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M4.58 8.60696L2 8.45396C3.849 3.70396 9.158 0.999958 14.333 2.34396C19.846 3.77696 23.121 9.26196 21.647 14.594C20.428 19.005 16.343 21.931 11.847 22"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M12 22C6.5 22 2 17 2 11M13.604 9.72202C13.252 9.35202 12.391 8.48502 11.029 9.10202C9.668 9.71702 9.452 11.698 11.511 11.909C12.441 12.004 13.048 11.799 13.604 12.379C14.16 12.961 14.263 14.577 12.843 15.013C11.423 15.449 10.502 14.729 10.255 14.504M11.908 8.02002V8.81002M11.908 15.147V16.02"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <TextP>나의 주식</TextP>
        </TextDiv>
      </DropdownMenu>

      {/* 뉴스 드롭다운 */}
      <MenuSectionG
        onClick={() => setNewsDropdown(!newsDropdown)}
        style={{ cursor: 'pointer' }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="25"
          height="25"
          viewBox="0 0 40 40"
          fill="none"
        >
          <path
            d="M33.5 40H6.5C4.83972 40.0001 3.24234 39.2061 2.03554 37.7808C0.828734 36.3555 0.103997 34.407 0.0100003 32.335L3.39974e-08 31.875V5.625C-0.000140044 4.19968 0.432591 2.82745 1.21074 1.78562C1.98889 0.743786 3.05442 0.110055 4.192 0.0125003L4.5 4.24968e-08H29.5C30.6403 -0.000175055 31.738 0.540738 32.5715 1.51342C33.405 2.48611 33.912 3.81803 33.99 5.24L34 5.625V7.5H35.5C36.6403 7.49982 37.738 8.04074 38.5715 9.01342C39.405 9.98611 39.912 11.318 39.99 12.74L40 13.125V31.875C40.0001 33.9503 39.3649 35.9471 38.2247 37.4556C37.0844 38.9641 35.5256 39.87 33.868 39.9875L33.5 40ZM6.5 36.25H33.5C34.3787 36.2499 35.2252 35.8367 35.8714 35.0924C36.5176 34.3481 36.9162 33.3272 36.988 32.2325L37 31.875V13.125C37 12.6719 36.8687 12.2341 36.6305 11.8927C36.3922 11.5512 36.0631 11.3291 35.704 11.2675L35.5 11.25H34V30.625C34 31.0781 33.8687 31.5159 33.6305 31.8573C33.3922 32.1988 33.0631 32.4209 32.704 32.4825L32.5 32.5C32.1375 32.5 31.7873 32.3359 31.5141 32.0381C31.241 31.7403 31.0633 31.3289 31.014 30.88L31 30.625V5.625C31 5.17191 30.8687 4.73415 30.6305 4.39267C30.3922 4.0512 30.0631 3.82912 29.704 3.7675L29.5 3.75H4.5C4.13752 3.75002 3.78732 3.91411 3.51414 4.21192C3.24096 4.50973 3.0633 4.92112 3.014 5.37L3 5.625V31.875C3.00003 32.973 3.33034 34.0308 3.92536 34.8385C4.52038 35.6462 5.3366 36.1447 6.212 36.235L6.5 36.25ZM20.492 26.25H26.504C26.884 26.2501 27.2499 26.4306 27.5276 26.7549C27.8053 27.0793 27.9741 27.5232 28.0001 27.9972C28.026 28.4712 27.907 28.9397 27.6671 29.3082C27.4273 29.6768 27.0845 29.9177 26.708 29.9825L26.504 30H20.492C20.112 29.9999 19.7461 29.8194 19.4684 29.4951C19.1907 29.1707 19.0219 28.7268 18.9959 28.2528C18.97 27.7788 19.089 27.3103 19.3289 26.9418C19.5687 26.5732 19.9115 26.3323 20.288 26.2675L20.492 26.25ZM14.486 17.5125C14.8838 17.5125 15.2654 17.71 15.5467 18.0617C15.828 18.4133 15.986 18.8902 15.986 19.3875V28.125C15.986 28.6223 15.828 29.0992 15.5467 29.4508C15.2654 29.8025 14.8838 30 14.486 30H7.496C7.09818 30 6.71664 29.8025 6.43534 29.4508C6.15404 29.0992 5.996 28.6223 5.996 28.125V19.3875C5.996 18.8902 6.15404 18.4133 6.43534 18.0617C6.71664 17.71 7.09818 17.5125 7.496 17.5125H14.486ZM12.986 21.2625H8.996V26.25H12.986V21.2625ZM20.492 17.5125H26.504C26.884 17.5126 27.2499 17.6931 27.5276 18.0174C27.8053 18.3418 27.9741 18.7857 28.0001 19.2597C28.026 19.7337 27.907 20.2022 27.6671 20.5707C27.4273 20.9393 27.0845 21.1802 26.708 21.245L26.504 21.2625H20.492C20.1092 21.2674 19.7395 21.0891 19.4584 20.7643C19.1774 20.4395 19.0063 19.9927 18.9802 19.5153C18.9542 19.038 19.0751 18.5662 19.3182 18.1966C19.5613 17.8271 19.9083 17.5877 20.288 17.5275L20.492 17.5125ZM7.496 8.755H26.504C26.8868 8.75013 27.2565 8.92836 27.5376 9.25318C27.8186 9.578 27.9897 10.0248 28.0158 10.5022C28.0418 10.9795 27.9209 11.4513 27.6778 11.8209C27.4347 12.1904 27.0877 12.4298 26.708 12.49L26.504 12.505H7.496C7.11595 12.5049 6.75012 12.3244 6.47242 12.0001C6.19472 11.6757 6.02585 11.2318 5.99995 10.7578C5.97404 10.2838 6.09303 9.81527 6.33286 9.44675C6.5727 9.07824 6.9155 8.83725 7.292 8.7725L7.496 8.755Z"
            fill="currentColor"
          />
        </svg>
        <MenuSectionGG>
          <TextTitle>뉴스</TextTitle>
          {!newsDropdown && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1rem"
              height="1rem"
              viewBox="0 0 24 24"
            >
              <g fill="none" fillRule="evenodd">
                <path d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.019-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" />
                <path
                  fill="currentColor"
                  d="M13.06 16.06a1.5 1.5 0 0 1-2.12 0l-5.658-5.656a1.5 1.5 0 1 1 2.122-2.121L12 12.879l4.596-4.596a1.5 1.5 0 0 1 2.122 2.12l-5.657 5.658Z"
                />
              </g>
            </svg>
          )}
          {newsDropdown && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1rem"
              height="1rem"
              viewBox="0 0 24 24"
            >
              <g fill="none" fillRule="evenodd">
                <path d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.019-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" />
                <path
                  fill="currentColor"
                  d="M10.94 7.94a1.5 1.5 0 0 1 2.12 0l5.658 5.656a1.5 1.5 0 1 1-2.122 2.121L12 11.122l-4.596 4.596a1.5 1.5 0 1 1-2.122-2.12z"
                />
              </g>
            </svg>
          )}
        </MenuSectionGG>
      </MenuSectionG>
      <DropdownMenu
        isOpen={newsDropdown}
        maxHeight={newsDropdownHeight}
        ref={newsDropdownRef}
      >
        <TextDiv
          onClick={() => navigate('/news-main')}
          style={{ cursor: 'pointer' }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M6 19H9V13H15V19H18V10L12 5.5L6 10V19ZM4 21V9L12 3L20 9V21H13V15H11V21H4Z"
              fill="currentColor"
            />
          </svg>
          <TextP>뉴스 메인</TextP>
        </TextDiv>
        <TextDiv
          onClick={() => navigate('/subnews-main/economic-news')}
          style={{ cursor: 'pointer' }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M21.75 12C21.75 6.61547 17.3845 2.25 12 2.25C6.61547 2.25 2.25 6.61547 2.25 12C2.25 17.3845 6.61547 21.75 12 21.75C17.3845 21.75 21.75 17.3845 21.75 12Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeMiterlimit="10"
            />
            <path
              d="M20.8861 8.06901C20.1333 8.0737 20.2073 9.4626 19.2694 8.80729C18.9211 8.56448 18.7069 8.21151 18.2695 8.10417C17.8875 8.01042 17.4961 8.10792 17.1187 8.17307C16.6898 8.24714 16.1812 8.28042 15.8559 8.60526C15.5414 8.91792 15.375 9.33745 15.0403 9.65198C14.3929 10.2614 14.1197 10.9265 14.5387 11.7881C14.9419 12.6164 15.7851 13.0659 16.695 13.0068C17.5889 12.9473 18.5175 12.4289 18.4917 13.7278C18.4823 14.1871 18.5784 14.5059 18.7195 14.9329C18.8503 15.3267 18.8414 15.7082 18.8714 16.1146C18.9267 16.874 19.0664 17.7253 19.4433 18.396L20.1464 17.4042C20.2331 17.2814 20.4145 17.1093 20.4576 16.9645C20.534 16.7081 20.3836 16.2674 20.3662 15.9801C20.3489 15.6928 20.3573 15.4017 20.3133 15.1143C20.2514 14.7117 20.0133 14.3343 19.9804 13.9364C19.92 13.1953 20.0554 12.6037 19.4845 11.984C18.9333 11.3864 18.1251 11.2429 17.3531 11.3643C16.964 11.4253 15.3979 11.6756 16.0265 10.7864C16.1508 10.6115 16.3678 10.4681 16.5075 10.3017C16.6289 10.1568 16.7344 9.89057 16.8769 9.7776C17.0194 9.66464 17.6737 9.53479 17.8612 9.59245C18.0487 9.6501 18.2442 9.92057 18.4069 10.0406C18.7074 10.2669 19.0581 10.4174 19.4292 10.4793C20.0695 10.5731 21.4083 10.2009 21.3979 9.37964C21.3961 8.98589 21.0304 8.43745 20.8861 8.06901ZM13.4742 14.8265C13.2244 13.7746 11.7951 13.4231 11.0245 12.8526C10.5815 12.5245 10.1873 12.0178 9.6056 11.9765C9.33748 11.9573 9.11294 12.0154 8.84716 11.9465C8.60341 11.8837 8.41216 11.7524 8.15248 11.7867C7.66732 11.8504 7.36123 12.3689 6.83998 12.2985C6.34544 12.232 5.83591 11.6535 5.72341 11.1824C5.57904 10.5768 6.0581 10.3804 6.57138 10.3265C6.7856 10.304 7.02607 10.2796 7.23185 10.3579C7.50279 10.4587 7.63076 10.724 7.87404 10.8581C8.33013 11.1079 8.42248 10.7085 8.35263 10.3035C8.2481 9.69698 8.12623 9.44948 8.66716 9.03229C9.04216 8.74448 9.36279 8.53635 9.30279 8.01932C9.26716 7.71557 9.10076 7.57823 9.25591 7.27589C9.37357 7.04573 9.69654 6.83807 9.90701 6.70073C10.4503 6.34635 12.2344 6.3726 11.5054 5.38073C11.2912 5.08964 10.8961 4.56932 10.5211 4.49807C10.0523 4.40948 9.84419 4.9326 9.51748 5.16323C9.17998 5.40182 8.52279 5.67276 8.18482 5.30385C7.73013 4.80745 8.48623 4.64432 8.65357 4.29792C8.82091 3.95151 8.26591 3.29667 7.96873 3.13073L6.57138 4.69776C6.53124 4.96019 6.54521 5.22807 6.61245 5.4849C6.67968 5.74173 6.79874 5.98209 6.96232 6.1912C7.24029 6.54885 7.68279 6.6637 7.70294 7.15214C7.72263 7.62089 7.64951 7.86089 7.34294 8.19042C7.21029 8.33104 7.11654 8.53073 6.98154 8.66245C6.81607 8.82323 6.87748 8.77401 6.61919 8.81807C6.13357 8.9001 5.72013 9.02667 5.25091 9.15604C4.46904 9.37214 4.39685 8.09479 4.0406 7.5937L2.86873 8.5401C2.85607 8.69526 3.06091 8.98073 3.11669 9.14948C3.43685 10.1137 4.08279 10.8595 4.49998 11.782C4.93919 12.7589 6.11857 12.4879 6.63935 13.3439C7.10154 14.1032 6.60794 15.0646 6.95388 15.8596C7.20513 16.4367 7.79763 16.5628 8.20638 16.9846C8.62404 17.4107 8.61513 17.9939 8.67888 18.5484C8.75074 19.2006 8.86743 19.8472 9.0281 20.4834C9.08482 20.7032 9.13685 20.9939 9.28732 21.1753C9.39044 21.2999 9.74435 21.4073 9.60138 21.4485C9.80107 21.4814 10.1569 21.6679 10.3233 21.531C10.5426 21.351 10.484 20.797 10.522 20.5467C10.6359 19.8014 11.009 19.0724 11.5125 18.5146C12.0098 17.9643 12.6914 17.5917 13.1114 16.9678C13.5206 16.3593 13.6439 15.5385 13.4742 14.8265ZM11.909 16.0603C11.6278 16.5623 11.0015 16.8984 10.5989 17.2973C10.4897 17.4056 10.2572 17.7806 10.1203 17.6995C10.0223 17.6414 9.98904 17.1548 9.95294 17.0432C9.76674 16.4814 9.41126 15.9911 8.93529 15.6393C8.78857 15.5282 8.42482 15.3839 8.34091 15.2315C8.24716 15.066 8.33154 14.6756 8.33482 14.4956C8.33998 14.2331 8.22044 13.7967 8.28513 13.5581C8.36013 13.2829 8.21576 13.4489 8.46185 13.3945C8.59169 13.3654 9.12794 13.4596 9.28966 13.4934C9.54654 13.5468 9.6881 13.7067 9.8906 13.8684C10.4231 14.2954 11.0095 14.6259 11.6062 14.9531C12.0684 15.209 12.2044 15.5329 11.909 16.0603ZM8.64654 3.14479C8.86873 3.36182 9.07779 3.6187 9.40919 3.64026C9.72279 3.66135 10.0186 3.49167 10.2923 3.70495C10.5961 3.93932 10.815 4.23604 11.2181 4.30917C11.6081 4.37995 12.0211 4.15214 12.1176 3.75323C12.2114 3.37307 12.0094 2.95964 11.9972 2.57807C11.9972 2.5251 12.0258 2.28979 11.9892 2.24995C11.962 2.21995 11.7351 2.2537 11.7004 2.25464C11.4464 2.26214 11.1929 2.27964 10.9401 2.30714C10.0185 2.40689 9.11589 2.63815 8.25982 2.99385C8.37373 3.0726 8.51669 3.10401 8.64654 3.14479ZM16.7062 5.77823C17.1042 5.77823 17.5083 5.6001 17.3798 5.13979C17.272 4.75401 17.0883 4.33542 16.6411 4.54354C16.3565 4.67573 15.9534 5.01229 15.9201 5.34604C15.8822 5.72479 16.4409 5.77823 16.7062 5.77823ZM16.3884 7.79245C16.7948 8.03573 17.3976 7.92135 17.7042 7.57401C17.9437 7.30214 18.0848 6.8301 18.5156 6.83057C18.7053 6.83018 18.8874 6.90444 19.0228 7.03729C19.2009 7.22151 19.1658 7.39448 19.2037 7.6251C19.2886 8.14307 19.844 7.65464 19.9889 7.45401C20.0826 7.32323 20.2097 7.12917 20.167 6.95901C20.1276 6.8001 19.942 6.63089 19.8595 6.4851C19.6186 6.06323 19.4203 5.57245 19.0594 5.23167C18.712 4.90354 18.285 4.94151 17.9554 5.28229C17.6854 5.56354 17.3719 5.7862 17.1872 6.12839C17.0569 6.36885 16.9101 6.4837 16.6462 6.54604C16.5009 6.58026 16.335 6.59292 16.2131 6.69042C15.8737 6.9576 16.0669 7.59932 16.3884 7.79245Z"
              fill="currentColor"
            />
          </svg>
          <TextP>시황 뉴스</TextP>
        </TextDiv>
        <TextDiv
          onClick={() => navigate('/subnews-main/stock-news')}
          style={{ cursor: 'pointer' }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M12 22C15.976 22 20 20.626 20 18V6C20 3.374 15.976 2 12 2C8.024 2 4 3.374 4 6V18C4 20.626 8.024 22 12 22ZM12 20C8.278 20 6 18.705 6 18V16.732C7.541 17.57 9.777 18 12 18C14.223 18 16.459 17.57 18 16.732V18C18 18.705 15.722 20 12 20ZM12 4C15.722 4 18 5.295 18 6C18 6.705 15.722 8 12 8C8.278 8 6 6.705 6 6C6 5.295 8.278 4 12 4ZM6 8.732C7.541 9.57 9.777 10 12 10C14.223 10 16.459 9.57 18 8.732V10C18 10.705 15.722 12 12 12C8.278 12 6 10.705 6 10V8.732ZM6 12.732C7.541 13.57 9.777 14 12 14C14.223 14 16.459 13.57 18 12.732V14C18 14.705 15.722 16 12 16C8.278 16 6 14.705 6 14V12.732Z"
              fill="currentColor"
            />
          </svg>
          <TextP>종목 뉴스</TextP>
        </TextDiv>
        <TextDiv
          onClick={() => handleProtectedClick('/my-news')}
          style={{ cursor: 'pointer' }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M5 21V5C5 4.45 5.196 3.97933 5.588 3.588C5.98 3.19667 6.45067 3.00067 7 3H17C17.55 3 18.021 3.196 18.413 3.588C18.805 3.98 19.0007 4.45067 19 5V21L12 18L5 21ZM7 17.95L12 15.8L17 17.95V5H7V17.95Z"
              fill="currentColor"
            />
          </svg>
          <TextP>관심 뉴스</TextP>
        </TextDiv>
      </DropdownMenu>
      <MenuSection
        onClick={() => navigate('/ai-chat-bot')}
        style={{ cursor: 'pointer' }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="25"
          height="25"
          viewBox="0 0 44 44"
          fill="none"
        >
          <path
            d="M33 33L42 42M38 20C38 15.2261 36.1036 10.6477 32.7279 7.27208C29.3523 3.89642 24.7739 2 20 2C15.2261 2 10.6477 3.89642 7.27208 7.27208C3.89642 10.6477 2 15.2261 2 20C2 24.7739 3.89642 29.3523 7.27208 32.7279C10.6477 36.1036 15.2261 38 20 38C24.7739 38 29.3523 36.1036 32.7279 32.7279C36.1036 29.3523 38 24.7739 38 20Z"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M11 26L14.684 14.948C14.7765 14.6722 14.9533 14.4324 15.1894 14.2625C15.4256 14.0926 15.7091 14.0012 16 14.0012C16.2909 14.0012 16.5744 14.0926 16.8106 14.2625C17.0467 14.4324 17.2235 14.6722 17.316 14.948L21 26M27 14V26M13 22H19"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <TextTitle>AI 챗봇</TextTitle>
      </MenuSection>
      <MenuSection
        onClick={() => navigate('/daily-report')}
        style={{ cursor: 'pointer' }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="25"
          height="25"
          viewBox="0 0 42 44"
          fill="none"
        >
          <path
            d="M10.4738 6.21021H6.26326C5.14656 6.21021 4.0756 6.65381 3.28597 7.44344C2.49634 8.23307 2.05273 9.30403 2.05273 10.4207V35.6839C2.05273 36.8006 2.49634 37.8716 3.28597 38.6612C4.0756 39.4508 5.14656 39.8944 6.26326 39.8944H18.2569M31.5264 25.1576V33.5786H39.9475M31.5264 18.8418V10.4207C31.5264 9.30403 31.0828 8.23307 30.2932 7.44344C29.5036 6.65381 28.4326 6.21021 27.3159 6.21021H23.1054"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M10.4731 18.8421H18.8942M10.4731 27.2632H16.7889M10.4731 6.21053C10.4731 5.09383 10.9168 4.02286 11.7064 3.23323C12.496 2.44361 13.567 2 14.6837 2H18.8942C20.0109 2 21.0819 2.44361 21.8715 3.23323C22.6611 4.02286 23.1047 5.09383 23.1047 6.21053C23.1047 7.32723 22.6611 8.39819 21.8715 9.18782C21.0819 9.97745 20.0109 10.4211 18.8942 10.4211H14.6837C13.567 10.4211 12.496 9.97745 11.7064 9.18782C10.9168 8.39819 10.4731 7.32723 10.4731 6.21053ZM23.1047 33.5789C23.1047 35.8124 23.9919 37.9543 25.5712 39.5335C27.1504 41.1128 29.2924 42 31.5258 42C33.7592 42 35.9011 41.1128 37.4804 39.5335C39.0596 37.9543 39.9468 35.8124 39.9468 33.5789C39.9468 31.3455 39.0596 29.2036 37.4804 27.6244C35.9011 26.0451 33.7592 25.1579 31.5258 25.1579C29.2924 25.1579 27.1504 26.0451 25.5712 27.6244C23.9919 29.2036 23.1047 31.3455 23.1047 33.5789Z"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <TextTitle>레포트</TextTitle>
      </MenuSection>
      {loginOpen && <Login closeLogin={closeLogin} />}
    </LeftDiv>
  );
};

export default Left;