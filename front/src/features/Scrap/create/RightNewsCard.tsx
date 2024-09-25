// import { TextP_16, TextP_22 } from '@features/Scrap/scrapStyledComponent';
// import {
//   RightNewsCardBottomDiv,
//   RightNewsCardDiv,
//   RightNewsCardTagDiv,
//   RightNewsCardTagP,
// } from '@features/Scrap/create/scrapCreateRightStyledComponent';

// interface Data {
//   title: string;
//   media: string;
//   uploadDatetime: string;
//   description: string;
//   keywords?: string[];
// }

// interface RightNewsProps {
//   data: Data;
// }

// const RightNewsCard: React.FC<RightNewsProps> = ({ data }) => {
//   const handleDragStart = (e: React.DragEvent) => {
//     e.dataTransfer.setData('text/plain', JSON.stringify(data));
//     e.dataTransfer.effectAllowed = 'move'; // 이동 가능한 요소로 설정
//     document.body.style.cursor = 'grabbing'; // 드래그 시작 시 커서 변경
//   };

//   const handleDragEnd = () => {
//     document.body.style.cursor = 'default'; // 드래그 끝난 후 커서 원래대로
//   };

//   return (
//     <RightNewsCardDiv
//       draggable
//       onDragStart={handleDragStart}
//       onDragEnd={handleDragEnd} // 드래그 끝난 후 커서 복구
//       style={{ cursor: 'grab' }} // 기본적으로 'grab' 커서
//     >
//       <TextP_22>{data.title}</TextP_22>
//       <RightNewsCardBottomDiv>
//         <TextP_16>
//           {data.media} | {data.uploadDatetime}
//         </TextP_16>
//         {data.keywords && (
//           <RightNewsCardTagDiv>
//             <RightNewsCardTagP>{data.keywords[0]}</RightNewsCardTagP>
//           </RightNewsCardTagDiv>
//         )}
//       </RightNewsCardBottomDiv>
//     </RightNewsCardDiv>
//   );
// };

// export default RightNewsCard;
