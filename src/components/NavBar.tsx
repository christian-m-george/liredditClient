import { Box, Flex } from "@chakra-ui/layout";
import { Button, Link } from "@chakra-ui/react";
import React from "react";
import NextLink from "next/link";
import { useMeQuery, useLogoutMutation } from "../generated/graphql";
import { isServer } from "../utils/isServer";

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = ({}) => {
  const [{fetching: logoutFetching}, logout] = useLogoutMutation();
  const [{ data, fetching }] = useMeQuery({
    pause: isServer(),
  });
  let body = null;

  // data is loading
  if (fetching) {
    body = null;
  } else if (!data?.me) {
    body = (
      <>
        <NextLink href="/login">
          <Link color="white" mr={2}>
            login
          </Link>
        </NextLink>
        <NextLink href="/register">
          <Link color="white">register</Link>
        </NextLink>
      </>
    );

    // user is logged in
  } else {
    body = (
    <Flex>
      <Box mr={2}>{data.me.username}</Box>
    <Box>
      <Button onClick={() => { logout() }}
      isLoading={logoutFetching}
      variant='link'>logout</Button>
      </Box>
    </Flex>);
  }
  return (
    <Flex bg="tomato" p={4}>
          <Box ml={"auto"}>{body}</Box>
    </Flex>
  );
};
