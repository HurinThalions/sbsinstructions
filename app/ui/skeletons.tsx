import styles from '@/app/ui/css/katalog.module.css';

export function KatalogSkeleton() {
  return (
    <div className="flex flex-col place-items-center">
      <div className={` ${styles.container}`}>
      </div>
    </div>
  );
}

export function AnleitungSkeleton() {
  return (
    <div className="flow-root display-flex p-6 md:overflow-y-auto md:p-12">
      <div className="float-left border-solid border-2 border-black rounded-lg min-w-[40%]"></div>
      <div className="lg:max-w-[40vw] lg:max-h-[45] rounded-lg float-right min-w-[40%] border-b border-black">
        <p>Das entsprechende Bild wird gerade geladen.</p>
      </div>
    </div>
  )
}