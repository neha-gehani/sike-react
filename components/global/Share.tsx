import React, {useState} from "react";
import { Button, Toast } from "react-bootstrap";

interface ShareProps {
  title: string,
  text: string,
  url: string
}

const Share: React.FC<ShareProps> = ({ title, text, url}) => {

  const showToast = (text) => {
    navigator.clipboard.writeText(text)
    setToast('URL Copied')
    setShow(true)
  }
  const share = async () => {
    if((navigator as any).share!= undefined) {
        try {
          const share = await (navigator as any).share({ title, text, url});
          console.log({share});
        } catch(err) {
          console.log({err});
          showToast(url)
        }
    } else {
      console.log('web-share not supported')
      showToast(url)
    }
  }

  const isShareEnabled = !!(navigator as any).share != undefined
  const [toast, setToast] = useState('');
  const [show, setShow] = useState(false);


  return (
  <>
    {isShareEnabled && <Button onClick={share}>Share</Button>}
    {toast!== '' && (<Toast onClose={() => setShow(false)} show={show}  autohide>
      <Toast.Body>{toast}</Toast.Body>
    </Toast>)}
  </>
    
  );
};

export default Share;
