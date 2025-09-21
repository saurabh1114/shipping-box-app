import React from 'react';

import '../styles/boxTable.scss'

const BoxList = ({ boxes }) => {

    if (boxes.length === 0) {
        return (
          <div className="no-data-card-container">
            <div className="card">
              <p>📦 No shipping boxes found. Add your first box!</p>
            </div>
          </div>
        );
      }
    
      return (
        <div style={{ padding: "2rem" }}>
          <div className="box-table-container">
            <div className="header">
              <h2>Shipping Boxes ({boxes.length})</h2>
            </div>
    
            <div style={{ overflowX: "auto" }}>
              <table className="table-container">
                <thead>
                  <tr>
                    <th>Receiver Name</th>
                    <th>Weight (kg)</th>
                    <th>Box Color</th>
                    <th>Destination Country</th>
                    <th>Shipping Cost (INR)</th>
                  </tr>
                </thead>
                <tbody>
                  {boxes.map((box: any) => (
                    <tr key={box.id}>
                      <td>{box.receiverName}</td>
                      <td>{box.weight}</td>
                      <td style={{display: 'flex', alignItems: 'center'}}>
                        <div className="color-preview">
                          <div
                            className="box-swatch"
                            style={{ backgroundColor: box.boxColorHex }}
                            title={`RGB: ${box.boxColor}`}
                          />
                        </div>
                        <div>{box.boxColor}</div>
                      </td>
                      <td>{box.destinationCountry}</td>
                      <td className="cost-text">INR {box.shippingCost}/-</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )
};

export default BoxList;