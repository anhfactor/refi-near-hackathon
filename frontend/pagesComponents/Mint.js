import Card from 'components/Card/Card';
import CardBody from 'components/Card/CardBody';
import CardFooter from 'components/Card/CardFooter';
import InputIcon from 'components/Input/InputIcon';
import Button from 'components/Button/Button';

export default function Mint(props) {
    return(
        <>
            <CardBody>
                <div className="mb-10">
                    <InputIcon
                        type="text"
                        color="lightBlue"
                        placeholder="Contract number *"
                        iconName="account_circle"
                    />
                </div>
                <div className="mb-10">
                    <InputIcon
                        type="text"
                        color="lightBlue"
                        placeholder="Asset name *"
                    />
                </div>
                <div className="">
                    <InputIcon
                        type="text"
                        color="lightBlue"
                        placeholder="Digital image asset *"
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
                        Create digital assets
                    </Button>
                </div>
            </CardFooter>
        </>
    );
}
