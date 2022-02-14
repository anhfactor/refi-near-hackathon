import Card from 'components/Card/Card';
import CardBody from 'components/Card/CardBody';
import CardFooter from 'components/Card/CardFooter';
import InputIcon from 'components/Input/InputIcon';
import Button from 'components/Button/Button';

export default function Swap(props) {
    return(
        <>
            <CardBody>
                <div className="mb-5">
                    <InputIcon
                        type="text"
                        color="lightBlue"
                        placeholder="PVF"
                    />
                </div>
                <div className="flex justify-center">
                <i class="fas fa-sync"></i>
                </div>
                <div>
                    <InputIcon
                        type="text"
                        color="lightBlue"
                        placeholder="eEUR"
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
                        Swap
                    </Button>
                </div>
            </CardFooter>
        </>
    );
}
