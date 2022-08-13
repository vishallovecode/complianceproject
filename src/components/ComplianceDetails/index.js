import React, { useState } from 'react';
import { NavLink, Button, Form, FormGroup, Input, Label } from "reactstrap";
import { BASE_URL } from '../../constants';
import AxiosInstance from '../../middleware/axios';
import StatusMessage from "../../Helpers/StatusMessage";
import './compliancedetails.scss'
import { Avatar, Comment } from 'antd';
const ComplianceDetails = () => {
    const [completedBy, setCompletedBy] = useState("");
    const [completionDate, setCompletionDate] = useState('');
    const [image, setImage] = useState('');
    const [amountPaid, setAmountpaid] = useState("");
    const [lateFee, penaltyFee] = useState("");
    const [loading, setLoading] = useState(false)
    const [imageUrl, setImageUrl] = useState('')
    const [uploadLoading, setuploadLoading] = useState(false)
    const [status, setStatus] = useState({
        loading: false,
        success: false,
        status: ""
    })

    const handleSubmit = () => {
        const data = {
            complianceId: localStorage.getItem('complianceId'),
            completionDate: completionDate,
            amountPaid: amountPaid,
            LateFee: lateFee,
            proofDocUrl: imageUrl
        }
        setStatus({
            loading: false,
            success: true,
            status: "Pending"
        })
        AxiosInstance.post(`${BASE_URL}compliance/update`, data).then((res) => {
            setStatus({
                loading: false,
                success: true,
                status: "Data SuccessFully Updated"
            })
        }).catch(() => {
            setStatus({
                loading: false,
                success: false,
                status: "Some Thing Went Wrong!"
            })
        });
    }

    const updateImage = (e) => {
        setImage(e.target.files[0])
    }
    const upload = () => {
        setuploadLoading(true)
        const formData = new FormData();
        formData.append(
            "upl",
            image
        );
        AxiosInstance.post(`${BASE_URL}compliance/update/upload`, formData).then((res) => {
            setImageUrl(res?.data?.urls[0]?.url)
            setuploadLoading(false)
        }).catch((error)=>{
            setuploadLoading(false)

            console.error("ERROR::" ,error)
        })
    }
    return (
        <div className="col-md-6 col-sm-12" style={{ maxWidth: "100%", marginLeft: "20%", padding: "20pxx" }}>
            <Form onSubmit={handleSubmit}>
                <div className="text-left">
                    <FormGroup>

                        <Label for="completedBy">Completed by</Label>
                        <Input
                            tabIndex={1}
                            type="text"
                            id="completedBy"
                            name="completedBy"
                            value={completedBy}
                            onChange={(e) => setCompletedBy(e.target.value)}
                        />
                    </FormGroup>
                    <FormGroup className="text-left">
                        <Label for="completionDate">Completion Date</Label>
                        <Input
                            tabIndex={2}
                            type="date"
                            id="completionDate"
                            name="completionDate"
                            value={completionDate}
                            onChange={(e) => setCompletionDate(e.target.value)}
                        />
                    </FormGroup>
                    <div className="text-left">
                        <Label for="image">Proof pdf/image</Label>
                        <div style={{ display: "flex" }}>
                            <input
                                tabIndex={3}
                                type="file"
                                id="image"
                                name="image"
                                // value={image}
                                onChange={(e) => updateImage(e)}
                            />
                            <Button onClick={upload} disabled ={!image}>Upload</Button>
                        </div>
                    </div>

                    <FormGroup className="text-left">
                        <Label for="amountPaid">Amount Paid If Any</Label>
                        <Input
                            tabIndex={4}
                            type="text"
                            id="amountPaid"
                            name="amountPaid"
                            value={amountPaid}
                            onChange={(e) => setAmountpaid(e.target.value)}
                        />
                    </FormGroup>
                    <FormGroup className="text-left">
                        <Label for="lateFee">Late Fee/penality if any</Label>
                        <Input
                            tabIndex={5}
                            type="text"
                            id="lateFee"
                            name="lateFee"
                            value={lateFee}
                            onChange={(e) => penaltyFee(e.target.value)}
                        />
                    </FormGroup>


                    <FormGroup className="text-center col-12 d-flex flex flex-column align-items-center">
                        <Button
                            tabIndex={6}
                            color="primary"
                            className="col-md-6 col-sm-12 mt-3"
                            onClick={handleSubmit}
                            disabled={loading}
                        >
                            {loading ? "Submitting......" : "Submit"}
                        </Button>
                    </FormGroup>
                    <FormGroup className="text-center">

                        <StatusMessage loading={status.loading}
                            success={status.success}
                            status={status.status}
                        />
                    </FormGroup>
                </div>
            </Form>
             {uploadLoading && <div className="cover-spin"></div>  }
        </div>

    )
}

export default ComplianceDetails;