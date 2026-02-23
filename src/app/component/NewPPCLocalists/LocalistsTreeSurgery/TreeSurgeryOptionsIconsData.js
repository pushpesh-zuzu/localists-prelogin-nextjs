import InstallNewRoof from "../../../../../public/newppc/InstallNewRoof";
import ReplaceYourCurrentRoof from "../../../../../public/newppc/ReplaceYourCurrentRoof";
import RepairCurrentRoof from "../../../../../public/newppc/RepairCurrentRoof";
import IOwnTheProperty from "../../../../../public/newppc/IOwnTheProperty";
import BuyingTheProperty from "../../../../../public/newppc/BuyingTheProperty";
import RentingTheProperty from "../../../../../public/newppc/RentingTheProperty";
import SomethingElse from "../../../../../public/newppc/SomethingElse";
import ResidentalHome from "../../../../../public/newppc/ResidentalHome";
import CommercialProperty from "../../../../../public/newppc/CommercialProperty";
import Garage from "../../../../../public/newppc/Garage";
import MobileHome from "../../../../../public/newppc/MobileHome";
import chimney from "../../../../../public/newppc/Chimney";
import Windows from "../../../../../public/newppc/Windows";
import SolarPanels from "../../../../../public/newppc/SolarPanels";
import Pipes from "../../../../../public/newppc/Pipes";
import SatelliteDishes from "../../../../../public/newppc/SatelliteDishes";
import Vents from "../../../../../public/newppc/Vents";
import NoObstruction from "../../../../../public/newppc/NoObstruction";
import OneStores from "../../../../../public/newppc/OneStores";
import TwoStorys from "../../../../../public/newppc/TwoStorys";
import ThreeStorys from "../../../../../public/newppc/ThreeStorys";
import FourStorysMore from "../../../../../public/newppc/FourStorysMore";
import ImReadtToHire from "../../../../../public/newppc/ImReadyToHire";
import DefinatilyHire from "../../../../../public/newppc/DefinatelyHire";
import SureHire from "../../../../../public/newppc/SureHire";
import WillPosibleHire from "../../../../../public/newppc/WillPosibleHire";
import Searching from "../../../../../public/newppc/Searching";
import Asap from "../../../../../public/newppc/Asap";
import WithAWeek from "../../../../../public/newppc/WithAWeek";
import WithAMonth from "../../../../../public/newppc/WithAMonth";
import NextMonth from "../../../../../public/newppc/NextMonth";
import WaterDamage from "../../../../../public/newppc/WaterDamage";
import DamageTiles from "../../../../../public/newppc/DamageTiles";
import RottedWood from "../../../../../public/newppc/RottedWood";
import RoofFlashing from "../../../../../public/newppc/RoofFlasing";
import chimneyRepair from "../../../../../public/newppc/ChimneyRepair";

const TreeSurgeonOptionsData = [
    {
        question_no: 1,
        options: [
            {
                optionId: 1,
                icon: InstallNewRoof,
                label: "Trimming or topping",
            },
            {
                optionId: 2,
                icon: ReplaceYourCurrentRoof,
                label: "Cutting down(felling)",
            },
            {
                optionId: 3,
                icon: RepairCurrentRoof,
                label: "Stump removal only",
            },
            {
                optionId: 4,
                icon: RepairCurrentRoof,
                label: "Diagnosis / Assessment",
            },
            {
                optionId: 5,
                icon: RepairCurrentRoof,
                label: "Bushes or other gardening tasks",
            },
            {
                optionId: 6,
                icon: RepairCurrentRoof,
                label: "Something else (please describe)",
            },
        ],
    },
    {
        question_no: 2,
        options: [
            {
                optionId: 1,
                icon: IOwnTheProperty,
                label: "4 or more",
            },
            {
                optionId: 2,
                icon: BuyingTheProperty,
                label: "3",
            },
            {
                optionId: 3,
                icon: RentingTheProperty,
                label: "2",
            },
            {
                optionId: 4,
                icon: SomethingElse,
                label: "1",
            },
        ],
    },
    {
        question_no: 3,
        options: [
            {
                optionId: 1,
                icon: ResidentalHome,
                label: "Large - over 8m (over 26ft)",
            },
            {
                optionId: 2,
                icon: CommercialProperty,
                label: "Medium - up to 8m (26ft)",
            },
            {
                optionId: 3,
                icon: Garage,
                label: "Small - up to 3m (9 ft)",
            },
        ],
    }, {
        question_no: 4,
        options: [
            {
                optionId: 1,
                icon: Windows,
                label: "No",
            },
            {
                optionId: 2,
                icon: chimney,
                label: "Yes - conservation area",
            },
            {
                optionId: 3,
                icon: SolarPanels,
                label: "Yes - TPO in place",
            },
            {
                optionId: 4,
                icon: Pipes,
                label: "I'm not sure",
            },
            {
                optionId: 5,
                icon: SatelliteDishes,
                label: "Something else (please describe)",
            },
        ],
    }, {
        question_no: 5,
        options: [
            {
                optionId: 1,
                icon: OneStores,
                label: "I would like the pro to remove the waste",
            },
            {
                optionId: 2,
                icon: TwoStorys,
                label: "I can take care of the waste",
            },
            {
                optionId: 3,
                icon: ThreeStorys,
                label: "I need to discuss with the pro",
            },
            {
                optionId: 4,
                icon: SomethingElse,
                label: "Something else (please describe)",
            },
        ],
    }, {
        question_no: 6,
        options: [
            {
                optionId: 1,
                icon: ImReadtToHire,
                label: "As soon as possible",
            },
            {
                optionId: 2,
                icon: DefinatilyHire,
                label: "In the next few days",
            },
            {
                optionId: 3,
                icon: SureHire,
                label: "In the next week",
            },
            {
                optionId: 4,
                icon: WillPosibleHire,
                label: "In the next few weeks",
            },
            {
                optionId: 5,
                icon: Searching,
                label: "I'm flexible",
            },
            {
                optionId: 6,
                icon: SomethingElse,
                label: "Something else (please describe)",
            },
        ],
    }, {
        question_no: 7,
        options: [
            {
                optionId: 1,
                icon: Asap,
                label: "I'm ready to hire immediately",
            },
            {
                optionId: 2,
                icon: WithAWeek,
                label: "I'm certain I'll be hiring someone",
            },
            {
                optionId: 3,
                icon: WithAMonth,
                label: "I'm leaning towards hiring someone",
            },
            {
                optionId: 4,
                icon: NextMonth,
                label: "I might hire someone",
            },
            {
                optionId: 5,
                icon: SomethingElse,
                label: "I'm still researching and exploring options",
            },
            {
                optionId: 6,
                icon: SomethingElse,
                label: "Something else (please describe)",
            },

        ],
    }, {
        question_no: 8,
        options: [
            {
                optionId: 1,
                icon: WaterDamage,
                label: "Yes",
            },
            {
                optionId: 2,
                icon: DamageTiles,
                label: "No",
            },
            {
                optionId: 3,
                icon: SomethingElse,
                label: "Something else (please describe)",
            },
        ],
    },
    {
        question_no: 9,
        options: [
            {
                optionId: 1,
                icon: WaterDamage,
                label: "4 or more",
            },
            {
                optionId: 2,
                icon: DamageTiles,
                label: "3",
            },
            {
                optionId: 3,
                icon: SomethingElse,
                label: "2",
            },
            {
                optionId: 4,
                icon: SomethingElse,
                label: "1",
            },
        ],
    }
];

export default TreeSurgeonOptionsData;