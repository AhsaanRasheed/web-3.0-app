import { useLoader } from "@/app/_components/global/Loader/loaderContext";
import timerStyle from "./timer.module.scss";
import { claim_virtuals } from "@/app/services/new_service";
import Countdown from "@/app/_components/ProfileBar/Components/Timer";

const ClaimTokenCountDownTimer = ({ time, token, refresh }) => {
  const { toggleLoader } = useLoader();
  // rewardAmount = (gap * reward.amount) / reward.duration;
  let timeTillDate = new Date(Number(time) * 1000);
  // console.log(time, token, 'timer time, token')
  return (
    <div className={timerStyle.headerWrapperCountDown}>
      {token < 50 && <div>
        <Countdown timeTillDate={time} timeFormat="MM DD YYYY, h:mm a" countdownDuration="1080" />
      </div>}
      <div
        style={{ opacity: token > 50 ? "" : "0.4", cursor: token > 50 ? 'pointer' : 'initial'}}
        className={timerStyle.claimBtn}
        onClick={() => {
          if (token > 50) {
            toggleLoader(true);
            claim_virtuals()
              .then(() => {
                toggleLoader(false);
                refresh();
                // window.location.reload();
              })
              .catch(() => {
                toggleLoader(false);
              });
          }
        }}
      >
        Claim
      </div>
    </div>
  );
};

export default ClaimTokenCountDownTimer;