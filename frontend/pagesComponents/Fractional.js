import Card from 'components/Card/Card';
import CardBody from 'components/Card/CardBody';
import CardFooter from 'components/Card/CardFooter';
import InputIcon from 'components/Input/InputIcon';
import Button from 'components/Button/Button';

export default function Fractional(props) {
    return(
        <>
            <CardBody>
                <div className="mb-10">
                    <InputIcon
                        type="text"
                        color="lightBlue"
                        placeholder="Enter Certificate ID *"
                        iconName="account_circle"
                    />
                </div>
                <div className="">
                    <InputIcon
                        type="text"
                        color="lightBlue"
                        placeholder="Enter Amount of PVF *"
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
                        Fractionalise
                    </Button>
                </div>
            </CardFooter>
        </>
    );
}
