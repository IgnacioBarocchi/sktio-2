import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faCheckSquare,
  faCoffee,
  faCircleExclamation,
  faTrash,
  faDownload,
  faMicrophone,
  faMicrophoneSlash,
  faImage,
  faPaperPlane,
  faFaceSmile,
  faArrowTurnDown,
  faCircleCheck,
  faCancel,
  faArrowRight,
  faArrowLeft,
  faCircleArrowRight,
  faPuzzlePiece,
  faWrench,
  faCodeBranch,
  faArrowsUpToLine,
  faArrowsDownToLine,
  faLinkSlash,
  faVideoSlash,
  faCopy,
  faCirclePlus,
} from "@fortawesome/free-solid-svg-icons";

import { faComment } from "@fortawesome/free-solid-svg-icons";

const useIcons = () =>
  library.add(
    faCheckSquare,
    faCoffee,
    faCircleExclamation,
    faTrash,
    faDownload,
    faMicrophone,
    faMicrophoneSlash,
    faImage,
    faPaperPlane,
    faFaceSmile,
    faArrowTurnDown,
    faCircleCheck,
    faCancel,
    faArrowRight,
    faCircleArrowRight,
    faArrowLeft,
    faPuzzlePiece,
    faWrench,
    faCodeBranch,
    faArrowsUpToLine,
    faArrowsDownToLine,
    faComment,
    faLinkSlash,
    faVideoSlash,
    faCopy,
    faCirclePlus
  );

export default useIcons;
