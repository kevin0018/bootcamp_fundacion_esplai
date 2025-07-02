import { useContext } from "react";
import TranslatorContext from "../../i18n/TranslatorContext";

export default function Collserola() {
    const { translate } = useContext(TranslatorContext);
    return (
        <div>
            <img src="/images/parks/collserola.jpg" alt={translate('collserolaTitle')} style={{ width: 400, height: 400, objectFit: 'cover', borderRadius: '1rem', display: 'block', margin: '0 auto' }} />
            <h1>{translate('collserolaTitle')}</h1>
            <p>{translate('collserolaP1')}</p>
            <p>{translate('collserolaP2')}</p>
        </div>
    );
}