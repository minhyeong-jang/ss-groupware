import {
  DashboardContainer,
  GoodByeContainer,
  LoginContainer,
} from "containers";
import { FC, useEffect, useState } from "react";
import styled from "styled-components";

const index: FC = () => {
  const [count, setCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const storage = localStorage.getItem("gw_musinsa_ss");
    if (storage) {
      const { id = "" } = JSON.parse(storage);
      if (["react", "ranlee", "areum", "imsearch"].includes(id)) {
        setIsOpen(true);
      }
    }
  }, []);
  useEffect(() => {
    const event = setTimeout(() => {
      if (count > 4) {
        setIsOpen(true);
      } else {
        setCount(0);
      }
    }, 700);

    return () => {
      clearTimeout(event);
    };
  }, [count]);

  return (
    <StyledPageLayout>
      {isOpen ? (
        <>
          <LoginContainer />
          <DashboardContainer />
        </>
      ) : (
        <GoodByeContainer
          onClick={() => {
            if (window.innerWidth >= 768) {
              setCount(count + 1);
            } else {
              count < 4 && setCount(count + 1);
            }
          }}
          onSubmit={() => {
            count === 4 && setCount(count + 1);
          }}
        />
      )}
    </StyledPageLayout>
  );
};

const StyledPageLayout = styled.div`
  position: relative;
  min-height: 100vh;
  padding: 16px;
`;
export default index;
