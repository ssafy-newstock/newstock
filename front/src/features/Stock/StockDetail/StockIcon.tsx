interface StockIconProps {
  buySuccess?: boolean;
  sellSuccess?: boolean;
}

const StockIcon: React.FC<StockIconProps> = ({ buySuccess, sellSuccess }) => {
  // buySuccess가 true면 green, sellSuccess가 true면 red, 둘 다 아니면 gray
  const iconColor = buySuccess ? 'green' : sellSuccess ? 'red' : 'gray'; 

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="51"
      height="50"
      viewBox="0 0 51 50"
      fill="none"
    >
      <path
        d="M5.7085 25C5.7085 15.6709 5.7085 11.0042 8.60641 8.10629C11.5043 5.20837 16.1689 5.20837 25.5002 5.20837C34.8293 5.20837 39.496 5.20837 42.3939 8.10629C45.2918 11.0042 45.2918 15.6688 45.2918 25C45.2918 34.3292 45.2918 38.9959 42.3939 41.8938C39.496 44.7917 34.8314 44.7917 25.5002 44.7917C16.171 44.7917 11.5043 44.7917 8.60641 41.8938C5.7085 38.9959 5.7085 34.3313 5.7085 25Z"
        stroke={iconColor}
        strokeWidth="3.125"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.7085 30.2084H6.83141C7.81475 30.2084 8.30641 30.2084 8.73558 30.0021C9.16266 29.798 9.46891 29.4125 10.0835 28.6438L13.0002 25L16.1252 30.2084L19.2502 22.9167L24.4585 33.3334L31.7502 18.75L35.9168 26.0417L39.0418 22.9167L42.0522 27.4334C42.5772 28.2209 42.8397 28.6146 43.2231 28.8521C43.2995 28.8993 43.3786 28.9417 43.4606 28.9792C43.8731 29.1667 44.346 29.1667 45.2918 29.1667M31.7502 5.20837V11.4584M31.7502 44.7917V30.2084"
        stroke={iconColor}
        strokeWidth="3.125"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M31.7503 20.8334C32.9009 20.8334 33.8337 19.9007 33.8337 18.7501C33.8337 17.5995 32.9009 16.6667 31.7503 16.6667C30.5997 16.6667 29.667 17.5995 29.667 18.7501C29.667 19.9007 30.5997 20.8334 31.7503 20.8334Z"
        stroke={iconColor}
        strokeWidth="3.125"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default StockIcon;
