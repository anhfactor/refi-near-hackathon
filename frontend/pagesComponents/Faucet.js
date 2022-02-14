import Card from 'components/Card/Card';
import CardBody from 'components/Card/CardBody';
import CardFooter from 'components/Card/CardFooter';
import InputIcon from 'components/Input/InputIcon';
import Button from 'components/Button/Button';

export default function Faucet(props) {
    return(
        <>
            <CardBody>
                <div className="">
                    <InputIcon
                        type="text"
                        color="lightBlue"
                        placeholder="$Amount"
                    />
                </div>
            </CardBody>
            <CardFooter>
                <div className="flex justify-center">
                    <Button
                        color="lightBlue"
                        size="lg"
                        ripple="dark"
                    >
                        Deposit
                    </Button>
                </div>
            </CardFooter>
        </>
    );
}
