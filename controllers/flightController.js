const express = require("express");
let flights = require("../flights.json");
const fs = require("fs");
const { stringify } = require("querystring");

exports.getAllFlights = (req, res) => {
  console.log("example");
  return res.json({ flights });
};

exports.bookFlight = (req, res) => {
  flights.push(req.body);
  // console.log(flights)
  let stringedData = JSON.stringify(flights);
  fs.writeFile("flights.json", stringedData, (err) => {
    if (err) {
      return res.status(500).json({ message: err });
    }
    return res.status(200).json({ success: true, newFlight: req.body });
  });
};

exports.searchFlightByTitle = (req, res) => {
  let flight = flights.find((flight) => {
    return String(flight.title) === req.params.title;
  });
  console.log(flight);
  return res.json({ flight });
};

exports.deleteFlight = async (req, res) => {
  let flight = flights.find((flight) => {
    return String(flight.title) === req.params.title;
  });

  //   console.log(flights)

  if (flight == undefined) {
    return res.status(404).json({ message: "Flight not found" });
  } else {
    flights = flights.filter((item) => {
      return String(item.title) != req.params.title;
    });
  }

  fs.writeFile("flights.json", JSON.stringify(flights), (err) => {
    if (err) {
      return res.status(500).json({ message: err });
    }
    return res.status(200).json({
      message: `successfully deleted ${req.params.title}`,
      flights,
    });
  });
};

exports.updateFlight = (req, res) => {
  let flight = flights.find((flight) => {
    return String(flight.title) === req.params.title;
  });
  console.log(req.body);

  if (flight == undefined) {
    return res.status(404).json({ message: "Flight not found" });
  } else {
    let i = flights.indexOf(flight);
    flights[i] = req.body;
  }
  fs.writeFile("flights.json", JSON.stringify(flights), (err) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Not your fault. Please try again" });
    }
    return res
      .status(200)
      .json({
        success: true,
        message: "flight successfully updated",
        flight: req.body,
      });
  });
};
