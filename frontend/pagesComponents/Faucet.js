import Card from 'components/Card/Card';
import CardBody from 'components/Card/CardBody';
import CardFooter from 'components/Card/CardFooter';
import InputIcon from 'components/Input/InputIcon';
import Button from 'components/Button/Button';
import Heading5 from 'components/Typography/Heading5';
import { requestTokens } from '../helper/StableCoin'

export default function Faucet(props) {
    // Get 10000 eEUR from faucet
    async function _requestTokens() {
        requestTokens();
    }
    return(
        <>
            <CardBody>
                <div className="flex justify-center">
                    <Heading5>eEUR Faucet</Heading5>
                </div>
            </CardBody>
            <CardFooter>
                <div className="flex justify-center">
                    <Button
                        color="lightBlue"
                        size="lg"
                        ripple="dark"
                        style={{textTransform: "none"}}
                        onClick={_requestTokens}
                    >
                        <i class="fas fa-coins"></i> Send me 10000 eEUR
                    </Button>
                </div>
            </CardFooter>
        </>
    );
}
