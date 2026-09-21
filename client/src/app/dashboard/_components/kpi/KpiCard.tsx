import { IconType } from "react-icons";
import { LuClipboardList } from "react-icons/lu";

interface KpiCard {
  KpiCardTitle: string;
  KpiCardIcon: IconType;
  KpiCardValue: string;
  KpiBackgroundIcon?: string;
}

const KpiCard = ({
  KpiCardTitle,
  KpiCardIcon,
  KpiCardValue,
  KpiBackgroundIcon,
}: KpiCard) => {
  return (
    <div className="bg-white rounded-lg shadow-xs not-sm:h-20s not-sm:h-auto not-sm:py-3 h-36.25 flex flex-col justify-center px-3 border-border border">
      <div className="flex items-center justify-between">
        <p className="text-xs font-medium text-muted-foreground">
          {KpiCardTitle}
        </p>
        <div
          className={`${KpiBackgroundIcon ? KpiBackgroundIcon : "bg-icon-background"} w-10 h-10 rounded-full flex items-center justify-center`}
        >
          <KpiCardIcon className="text-primary" />
        </div>
      </div>
      <div className="py-1">
        <p className="text-2xl font-extrabold">{KpiCardValue}</p>
      </div>
    </div>
  );
};

export default KpiCard;
