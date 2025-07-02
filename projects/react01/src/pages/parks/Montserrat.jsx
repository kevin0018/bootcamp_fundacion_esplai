import { useContext } from "react";
import TranslatorContext from "../../i18n/TranslatorContext";

export default function Montserrat() {
    const { translate } = useContext(TranslatorContext);
    return (
        <div>
            <img src="/images/parks/montserrat.jpg" alt={translate('montserratTitle')} style={{ width: 400, height: 400, objectFit: 'cover', borderRadius: '1rem', display: 'block', margin: '0 auto' }} />
            <h2 className='text-light text-center mb-4 mt-3'>{translate('montserratTitle')}</h2>
            <p>{translate('montserratP1')}</p>
            <p>{translate('montserratP2')}</p>
        </div>
    );
}