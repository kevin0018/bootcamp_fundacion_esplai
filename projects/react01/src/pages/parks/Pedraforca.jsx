import { useContext } from "react";
import TranslatorContext from "../../i18n/TranslatorContext";

export default function Pedraforca() {
    const { translate } = useContext(TranslatorContext);
    return (
        <div>
            <img src="/images/parks/pedraforca.jpg" alt={translate('pedraforcaTitle')} style={{ width: 400, height: 400, objectFit: 'cover', borderRadius: '1rem', display: 'block', margin: '0 auto' }} />
            <h2 className='text-light text-center mb-4 mt-3'>{translate('pedraforcaTitle')}</h2>
            <p>{translate('pedraforcaP1')}</p>
            <p>{translate('pedraforcaP2')}</p>
        </div>
    );
}