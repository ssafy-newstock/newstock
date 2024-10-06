import { Background, Modal, Overlay, BigModal } from '@components/ModalComponents';
import styled from 'styled-components';

interface AnalysisModalProps {
  onClose?: () => void;
  response: any;
  newslist: any[];
}

const CancelButton = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 16px;
  background-color: ${({ theme }) => theme.profileBackgroundColor};
  font-weight: bold;
  color: ${({ theme }) => theme.profileColor};
  padding: 8px 16px;
  border-radius: 9999px;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
`;

const AnalysisModal: React.FC<AnalysisModalProps> = ({ onClose, response, newslist }) => {
  return (
    <Overlay>
      <Background onClick={onClose}>
        <BigModal>
          <div>
            <h2>Response:</h2>
            <pre>{response}</pre>
          </div>
          <div id="news-container">
            {newslist.map((news, index) => (
              <div key={index} className="news-item">
                <div className="news-thumbnail">
                  <img
                    src={
                      news.thumbnail || 'https://via.placeholder.com/100'
                    }
                    alt="thumbnail"
                  />
                </div>
                <div className="news-content">
                  <div className="news-title">{news.title}</div>
                  <div className="news-meta">
                    업로드 날짜: {news.upload_datetime} | 미디어:{' '}
                    {news.media}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <CancelButton onClick={onClose}>취소</CancelButton>
        </BigModal>
      </Background>
    </Overlay>
  );
};

export default AnalysisModal;