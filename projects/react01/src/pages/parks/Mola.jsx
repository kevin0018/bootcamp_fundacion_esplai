import { useContext } from "react";
import TranslatorContext from "../../i18n/TranslatorContext";

export default function Mola() {
    const { translate } = useContext(TranslatorContext);
    return (
        <div>
            <img src="/images/parks/mola.jpg" alt={translate('molaTitle')} style={{ width: 400, height: 400, objectFit: 'cover', borderRadius: '1rem', display: 'block', margin: '0 auto' }} />
            <h2 className='text-light text-center mb-4 mt-3'>{translate('molaTitle')}</h2>
            <p>{translate('molaP1')}</p>
            <p>{translate('molaP2')}</p>
        </div>
    );
}