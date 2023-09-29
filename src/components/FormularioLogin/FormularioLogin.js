import classes from './FormularioLogin.module.css';
import resets from '../_resets.module.css';
import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';

export default function FormularioLogin() {
  const [login, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [data, setData] = useState([]);
  
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const authApiEndpoint = 'http://localhost:3001/login/';

    try {
      const response = await fetch(authApiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ login, password }),
      });

      if (response.ok) {
        // Authentication successful
        setIsAuthenticated(true);
      } else {
        // Authentication failed
        setIsAuthenticated(false);
        console.error('Authentication failed');
      }
    } catch (error) {
      console.error('Error during authentication:', error);
    }
  };

  useEffect(() => {
    // Replace 'YOUR_DATA_API_ENDPOINT' with the actual data API endpoint
    const dataApiEndpoint = 'http://localhost:3001/cafes';

    const fetchData = async () => {
      try {
        const response = await fetch(dataApiEndpoint);
        if (response.ok) {
          const result = await response.json();
          console.log(result);
          setData(result);
        } else {
          console.error('Error fetching data:', response.status);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    // Fetch data only if authentication is successful
    if (isAuthenticated) {
      fetchData();
    }
  }, [isAuthenticated]);
  return (
    <div className={`${resets.storybrainResets} ${classes.root}`}>
      <div className={classes.rectangle3}></div>
      <div className={classes.contactUs573102105253InfoElaro}>
        Contact us: +57 3102105253 - info@elaromamagico.com - @elaromamagico
      </div>
      <div className={classes.frame9}>
        <div className={classes.elAromaMagico}>El aroma mágico</div>
        <div className={classes.line14}></div>
        <div className={classes.image1}></div>
        <div className={classes.line13}></div>
      </div>
      {isAuthenticated ? (
        <div>
          <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Nombre</th>
            <th>Tipo</th>
            <th>Region</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.nombre}</td>
              <td>{item.tipo}</td>
              <td>{item.region}</td>
            </tr>
          ))}
        </tbody>
      </Table>
        </div>
      )   	  
      : (
        <form onSubmit={handleSubmit}>
        
        <label className={classes.nombreDeUsuario}>Nombre de usuario</label>
        <input className={classes.rectangle4} type="text" value={login} onChange={handleUsernameChange}></input>
        <label className={classes.contrasena}>Contraseña</label>
        <input className={classes.rectangle5} type="password" value={password} onChange={handlePasswordChange}></input>

        <div className={classes.rectangle6}></div>
        <div className={classes.rectangle7}></div>
        <button className={classes.ingresar} type="submit">Ingresar</button>
        <button className={classes.cancelar}>Cancelar</button>
        <div className={classes.inicioDeSesion}>Inicio de sesión</div>
      </form>
      )}
    </div>
);
}
