import { RiHeart3Line, RiHeart3Fill } from "react-icons/ri";
import { FaRetweet } from "react-icons/fa";
import clsx from "clsx";

import tw from "@/utils/string.utils";
import useToggle from "@/hooks/useToggle";
import ButtonIcon from "./ButtonIcon";
import Avatar from "./Avatar";
import styles from "./Card.module.css";

function Card() {
  const [like, toggleLike] = useToggle({ initialValue: false });

  const baseStyles = tw`shadow-md`;
  const cardStyles = clsx(baseStyles, styles.card);

  return (
    <div className={cardStyles}>
      <Avatar className={styles.avatar} />
      <h2 className={styles.header}>
        <p>Keanu Reeves</p>
        <span className="text-sm font-light">@username</span>
      </h2>

      <p className={styles.text}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla rhoncus
        ipsum ut volutpat aliquet. Integer sollicitudin eleifend dui, sed
        euismod justo dapibus at. Praesent suscipit bibendum porta. Mauris ac
        consectetur turpis, feugiat convallis erat. Suspendisse sit amet velit
        massa. Curabitur ornare accumsan elit id dictum. Duis turpis tellus,
        molestie et lacus sit amet, pretium placerat dui. Morbi in venenatis mi,
        nec tempor mauris.
      </p>

      <div className={styles.buttons}>
        <ButtonIcon onClick={toggleLike}>
          {like ? <RiHeart3Fill /> : <RiHeart3Line />}
        </ButtonIcon>
        <ButtonIcon>
          <FaRetweet />
        </ButtonIcon>
      </div>
    </div>
  );
}

export default Card;
