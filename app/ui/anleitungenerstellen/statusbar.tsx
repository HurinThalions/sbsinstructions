import styles from '@/app/ui/css/statusbar.module.css';


export default function Statusbar() {

    return (

        <div className='display-flex w-full m-4'>
            <ul className={`${styles.multi_steps} list-unstyled multi-steps`}>
                <li>
                    <div className="margin-left: -4px;">Infos</div>
                </li>
                <li className={`${styles.is_active}`}>
                    <div className="margin-left: -18px;">Schritte</div>
                </li>
                <li>
                    <div className="margin-right: -7px;">Fertig</div>
                </li>
            </ul>
        </div>
    )
}