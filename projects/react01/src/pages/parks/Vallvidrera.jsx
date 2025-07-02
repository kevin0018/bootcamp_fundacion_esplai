import { useContext } from "react";
import TranslatorContext from "../../i18n/TranslatorContext";

export default function Vallvidrera() {
    const { translate } = useContext(TranslatorContext);
    return (
        <div>
            <img src="/images/parks/vallvidrera.jpg" alt={translate('vallvidreraTitle')} style={{ width: 400, height: 400, objectFit: 'cover', borderRadius: '1rem', display: 'block', margin: '0 auto' }} />
            <h1>{translate('vallvidreraTitle')}</h1>
            <p>{translate('vallvidreraP1')}</p>
            <p>{translate('vallvidreraP2')}</p>
        </div>
    );
}