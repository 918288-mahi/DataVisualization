import React, { useState, useEffect } from "react";
import Plot from "react-plotly.js";
import axios from "axios";
import Form from 'react-bootstrap/Form';
import './chart.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

const Chart = () => {
    const [data, setData] = useState([]);
    const [selectedData, setSelectedData] = useState(null);

    useEffect(() => {
        axios.get("http://localhost:8080/data/source1")
            .then(response => setData(response.data))
            .catch(error => console.log(error));
    }, []);

    const handleDataSelection = async (event) => {
        const source = event.target.value;
        setSelectedData(source);

        if (source === "source1" || source === "source2" || source === "source3" || source === "source4") {
            const response = await fetch(`http://localhost:8080/data/${source}`);
            const data = await response.json();
            setData(data);
        }
    };

    const chartData = selectedData ? data : [];


    return (
        <div >
            <div className="text-center">
                <h1 style={{ backgroundColor: "lightblue", color: "grey" }}>Data Visualization Dashboard</h1>
            </div>

            <div>
                <Form>
                    <Form.Group controlId="data-select">
                        <Form.Label className="lable">Select A Data Source</Form.Label>
                        <Form.Select size="sm" style={{ width: "250px", color: "blueviolet" }} onChange={handleDataSelection}>
                            <option value="" style={{ color: "grey" }}>Select Data Source</option>
                            <option value="source1" className="options">Data Source 1</option>
                            <option value="source2" className="options">Data Source 2</option>
                            <option value="source3" className="options">Data Source 3</option>
                            <option value="source4" className="options">Data Source 4</option>
                        </Form.Select>
                        <Form.Check type="checkbox" className="checkbox" label="Select Dark Color" onChange={(e) => {
                            const isChecked = e.target.checked;
                            document.body.style.backgroundColor = isChecked ? "rgb(65, 62, 62)" : "white";
                        }} />

                    </Form.Group>
                </Form>
            </div>
            <div >
                <Container>
                    <Row >
                        <Col md={{ span: 3, offset: 3 }}>
                            <Plot                               
                                  data={[
                                    {
                                        x: chartData.x,
                                        y: chartData.y,
                                        type: "scatter",
                                        mode: "lines+markers",
                                        marker: { color: "red" },
                                    },
                                    { type: "bar", x: [1, 2, 3, 4, 5], y: [1, 5, 8, 2, 3] },
                                ]}
                                layout={{ width: 650, height: 440, title: " " }}
                            />
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    );
};

export default Chart;
