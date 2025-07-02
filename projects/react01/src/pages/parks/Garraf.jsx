import { useContext } from "react";
import TranslatorContext from "../../i18n/TranslatorContext";

export default function Garraf() {
    const { translate } = useContext(TranslatorContext);
    return (
        <div>
            <img src="/images/parks/garraf.jpg" alt={translate('garrafTitle')} style={{ width: 400, height: 400, objectFit: 'cover', borderRadius: '1rem', display: 'block', margin: '0 auto' }} />
            <h2 className='text-light text-center mb-4 mt-3'>{translate('garrafTitle')}</h2>
            <p>{translate('garrafP1')}</p>
            <p>{translate('garrafP2')}</p>
        </div>
    );
}