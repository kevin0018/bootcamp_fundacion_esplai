import { useContext } from "react";
import TranslatorContext from "../../i18n/TranslatorContext";

export default function Llobregat2() {
    const { translate } = useContext(TranslatorContext);
    return (
        <div>
            <img src="/images/parks/llobregat2.jpg" alt={translate('llobregat2Title')} style={{ width: 400, height: 400, objectFit: 'cover', borderRadius: '1rem', display: 'block', margin: '0 auto' }} />
            <h2 className='text-light text-center mb-4 mt-3'>{translate('llobregat2Title')}</h2>
            <p>{translate('llobregat2P1')}</p>
            <p>{translate('llobregat2P2')}</p>
        </div>
    );
}