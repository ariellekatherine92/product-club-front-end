import React, { useState } from "react";
import { Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import WeatherWidget from "../../components/WeatherWidget";

export default function Dashboard(props) {
  return (
    <>
      <WeatherWidget weather={props.weather} town={props.town} />
    </>
  );
}
