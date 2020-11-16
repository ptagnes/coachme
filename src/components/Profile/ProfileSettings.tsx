import React from "react";
import styled from "styled-components";
import { Switch, Route, withRouter } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";

import ProfileAnimateIn from "./ProfileAnimateIn";

function Container({ location }: { location: any }) {
  return (
    <>
      <Wrapper>
        <TransitionGroup className="transition-group">
          <CSSTransition
            key={location.key}
            timeout={{ enter: 200, exit: 300 }}
            classNames="slide"
          >
            <section className="route-section">
              <Switch location={location}>
                <Route
                  exact
                  path="/profiletoanimatein"
                  component={ProfileAnimateIn}
                />
              </Switch>
            </section>
          </CSSTransition>
        </TransitionGroup>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  div.transition-group {
    position: relative;
  }
  section.route-section {
    position: fixed;
    width: 100%;
    top: 0;
    left: 0;
  }
  .slide-enter {
    opacity: 0.9;
    transform: translateY(100%);
    position: absolute;
  }
  .slide-enter-active {
    transition: opacity 300ms ease-in;
    transform: translateY(0%);
    transition: transform 1000ms linear;
    transition-duration: 0.5s;
    transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
  }
  .slide-exit {
    opacity: 1;
    transform: translateY(0%);
  }
  .slide-exit-active {
    opacity: 0.8;
    transform: translateY(100%);
    transition: all 1000ms ease-out;
    transition-property: all;
    transition-duration: 0.5s;
    transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
  }
`;

export default withRouter(Container);
