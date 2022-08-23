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
            count < 4 && setCount(count + 1);
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
