import { useContext } from "react";
import TranslatorContext from "../../i18n/TranslatorContext";

export default function Llobregat() {
    const { translate } = useContext(TranslatorContext);
    return (
        <div>
            <img src="/images/parks/llobregat.jpg" alt={translate('llobregatTitle')} style={{ width: 400, height: 400, objectFit: 'cover', borderRadius: '1rem', display: 'block', margin: '0 auto' }} />
            <h2 className='text-light text-center mb-4 mt-3'>{translate('llobregatTitle')}</h2>
            <p>{translate('llobregatP1')}</p>
            <p>{translate('llobregatP2')}</p>
        </div>
    );
}