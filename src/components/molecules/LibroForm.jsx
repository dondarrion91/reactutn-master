import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const LibroForm = () => {
    let { id } = useParams();

    const [libro, setlibro] = useState([]);
    const [categorias, setcategorias] = useState([]);
    const [personas, setpersonas] = useState([]);
    const [status, setStatus] = useState(false);

    const [libroData, setLibrodata] = useState({});

    const fetchRequest = async (prop, setter, setStatus, url) => {
        try {
            const res = await axios.get(url);

            if (res.status === 200) {
                setter(res.data[prop]);
                setStatus(true);
            } else {
                setStatus(false);
            }
        } catch (error) {
            console.log(error);
            setStatus(false);
        }
    };

    const saveBook = async (event) => {
        event.preventDefault();
        try {
            const res = await axios.put(
                `http://localhost:706/libros/${id}`,
                libroData
            );
            if (res.status === 200) {
                console.log(res);
            } else {
                setStatus(false);
            }
        } catch (error) {
            console.log(error);
            setStatus(false);
        }
    };

    useEffect(() => {
        fetchRequest(
            "book",
            setlibro,
            setStatus,
            `http://localhost:706/libros/${id}`
        );

        fetchRequest(
            "respuesta",
            setcategorias,
            setStatus,
            `http://localhost:706/categoria`
        );

        fetchRequest(
            "respuesta",
            setpersonas,
            setStatus,
            `http://localhost:706/persona`
        );
    }, []);

    useEffect(() => {
        if (libro[0]) {
            setLibrodata({
                nombre: libro[0].nombre,
                descripcion: libro[0].descripcion,
                categoria_id: libro[0].categoria_id,
                persona_id: libro[0].persona_id,
            });
        }
    }, [libro]);

    console.log(libroData);

    function onChangeLibro(event) {
        setlibro({
            [event.target.name]: event.target.value,
        });

        setLibrodata({
            ...libroData,
            [event.target.name]: event.target.value,
        });
    }

    return (
        <>
            <form className="bookform">
                {!libro ? (
                    "Error al cargar el libro"
                ) : (
                    <section>
                        <div>
                            <div className="controlgroup">
                                <label htmlFor="nombre">Nombre</label>
                                <input
                                    type="text"
                                    id="nombre"
                                    name="nombre"
                                    value={!libro[0] ? null : libro[0].nombre}
                                    onInput={onChangeLibro}
                                ></input>
                                <span>
                                    {!status ? (
                                        <small className="error">
                                            mensaje de error
                                        </small>
                                    ) : null}
                                </span>
                            </div>
                            <div className="controlgroup">
                                <label htmlFor="descripcion">Descripcion</label>
                                <textarea
                                    id="msg"
                                    name="descripcion"
                                    value={
                                        !libro[0] ? null : libro[0].descripcion
                                    }
                                    onInput={onChangeLibro}
                                ></textarea>
                                <span>
                                    {!status ? (
                                        <small className="error">
                                            mensaje de error
                                        </small>
                                    ) : null}
                                </span>
                            </div>
                            <div className="controlgroup">
                                <label htmlFor="categoria_id">Categoria</label>
                                <select
                                    name="categoria_id"
                                    id="categoria_id"
                                    onInput={onChangeLibro}
                                >
                                    <option value="" selected>
                                        Elige una categoria
                                    </option>

                                    {!libroData
                                        ? null
                                        : categorias.map((categoria) => {
                                              if (
                                                  categoria.categoria_id ===
                                                  libroData.categoria_id
                                              ) {
                                                  return (
                                                      <option
                                                          value={
                                                              categoria.categoria_id
                                                          }
                                                          key={
                                                              categoria.categoria_id
                                                          }
                                                          selected
                                                      >
                                                          {categoria.nombre}
                                                      </option>
                                                  );
                                              }

                                              return (
                                                  <option
                                                      value={
                                                          categoria.categoria_id
                                                      }
                                                      key={
                                                          categoria.categoria_id
                                                      }
                                                  >
                                                      {categoria.nombre}
                                                  </option>
                                              );
                                          })}
                                </select>
                                <span>
                                    {!status ? (
                                        <small className="error">
                                            mensaje de error
                                        </small>
                                    ) : null}
                                </span>
                            </div>
                            <div className="controlgroup">
                                <label htmlFor="persona_id">Prestado a</label>
                                <select
                                    name="persona_id"
                                    id="persona_id"
                                    onInput={onChangeLibro}
                                >
                                    <option value="" selected>
                                        Elige una persona
                                    </option>
                                    {!libroData
                                        ? null
                                        : personas.map((persona) => {
                                              if (
                                                  persona.persona_id ===
                                                  libroData.persona_id
                                              ) {
                                                  return (
                                                      <option
                                                          value={
                                                              persona.persona_id
                                                          }
                                                          key={
                                                              persona.persona_id
                                                          }
                                                          selected
                                                      >
                                                          {persona.nombre}
                                                      </option>
                                                  );
                                              }

                                              return (
                                                  <option
                                                      value={persona.persona_id}
                                                      key={persona.persona_id}
                                                  >
                                                      {persona.nombre}
                                                  </option>
                                              );
                                          })}
                                </select>
                                <span>
                                    {!status ? (
                                        <small className="error">
                                            mensaje de error
                                        </small>
                                    ) : null}
                                </span>
                            </div>
                        </div>
                    </section>
                )}
                <button onClick={saveBook}>Prestar libro</button>
            </form>
        </>
    );
};

export default LibroForm;
