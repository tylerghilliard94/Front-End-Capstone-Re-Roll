import React, {useState, useEffect} from "react"
import APIManager from "../Modules/APIManager"
import CharacterNavBar from "../NavBar/CharacterNavBar"
import {Card, Form, FormControl, Row, Button, Col} from "react-bootstrap"
import SpellCard from "./SpellCard"

const SpellDetails = props => {
    const [spell, setSpell] = useState({})
    


    useEffect(() =>{
        APIManager.GetSpellDetails(sessionStorage.spellUrl).then((response) => setSpell(response))

    }, [])

   const handleSaveSpell = () => {
       spell.characterId = parseInt(sessionStorage.characterId)
        spell.spellType = sessionStorage.spellType
       APIManager.Post("spellBook", spell).then(() =>{
           props.history.push("/SpellBook")
       })
   }
    return(
        <>
        <CharacterNavBar {...props} />
        <Card className="spellDetailCard">
            <Card.Body className="spellDetailCardBody">
      
    <h1 className="spellName">{spell.name}</h1>
    
    {/* {spell.classes.map(type=>
        <h2>{type.name}</h2>)} */}
  
     
      
            <p className="spellDesc">{spell.desc}</p>
            <p className="spellHigher">{spell.higher_level}</p>
           
            <Row>
                <Col>
            <p className="spellRange">Range: {spell.range}</p>
            </Col>
            <Col>
            <p className="spellDuration">{spell.duration}</p>
            </Col>
            </Row>
            <Row>
            <Col>
            <p className="spellLevel">Spell Level: {spell.level}</p>
            </Col>
            
            {/* <p>{spell.school.name}</p> */}
           
           
            <Col>
            <p className="spellCastTime">{spell.casting_time}</p>
            </Col>
            {/* <p>{spell.dc.dc_type.name}</p> */}
            {/* <p>{spell.dc.dc_success}</p> */}
            </Row>
         
      
        <Button className="saveSpellBtn" onClick={handleSaveSpell}>
        Save spell
        </Button>
        </Card.Body>
        </Card>
        </>
    )
}

export default SpellDetails