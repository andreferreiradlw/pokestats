import React, { Fragment } from 'react';
// helpers
import { PokemonTCG } from 'pokemon-tcg-sdk-typescript';
// components
import Box, { BoxProps } from '@/components/Box';
import BoxWrapper from '@/components/Box/StyledBox';
import { AnimatePresence } from 'framer-motion';
import { fadeInUpVariant, removeDash } from '@/helpers';
import { PageHeading, SectionMessage, SectionSubTitle } from '@/BaseStyles';
import {
  AbilityDesc,
  AbilityName,
  AbilityTypeContainer,
  AttackCostContainer,
  AttackDesc,
  AttackDescRow,
  AttackName,
  AttackTable,
  CardDivider,
  CardEvo,
  CardFlavor,
  CardHP,
  CardSetIcon,
  CardSubtitle,
  CardTitle,
} from './StyledCardDetails';
import CardIcon from '@/components/CardIcon';
import CardAbilityIcon from '@/components/CardAbilityIcon';

interface CardDetailsProps extends BoxProps {
  card: PokemonTCG.Card;
}

const CardDetails = ({ card, ...rest }: CardDetailsProps): JSX.Element => {
  // data
  const {
    types,
    set,
    id,
    name,
    supertype,
    subtypes,
    evolvesFrom,
    flavorText,
    hp,
    attacks,
    abilities,
  } = card;

  const { images } = set;

  return (
    <AnimatePresence mode="wait">
      <BoxWrapper
        flexdirection="column"
        flexalign={{ xxs: 'center', lg: 'flex-start' }}
        flexgap="1em"
        width="100%"
        initial="hidden"
        animate="show"
        variants={fadeInUpVariant}
        key={`card-details-${id}`}
        {...rest}
      >
        <Box
          flexalign={{ xxs: 'center', lg: 'flex-start' }}
          flexdirection="column"
          flexgap={{ xxs: '0.5em', lg: '0.3em' }}
        >
          <Box flexdirection="row" flexalign="center" flexjustify="space-between" flexgap="1em">
            <CardSetIcon src={images.symbol} />
            <CardHP flexdirection="row" flexalign="flex-end" flexgap="0.5em" width="auto">
              <span>HP</span>
              <p>{hp}</p>
              {types.map((type, i) => (
                <CardIcon
                  key={`${id}-${type}-icon-${i}`}
                  alt={`${name} ${type} icon`}
                  cardType={type}
                />
              ))}
            </CardHP>
          </Box>
          <CardTitle>{removeDash(name)}</CardTitle>
          <CardSubtitle>{`${supertype} - ${subtypes.join(', ')}`}</CardSubtitle>
          {evolvesFrom && <CardEvo>{`Evolves from ${evolvesFrom}`}</CardEvo>}
        </Box>
        {flavorText && <CardFlavor>{flavorText}</CardFlavor>}
        <CardDivider />

        {abilities?.length > 0 && (
          <Box flexalign="flex-start" flexgap="0.5em">
            <SectionSubTitle>Abilities</SectionSubTitle>
            {abilities.map(({ name: abilityName, text, type: abilityType }, i) => (
              <Fragment key={`${name}-${abilityName}-${id}-${i}`}>
                <AbilityTypeContainer flexdirection="row" flexjustify="flex-start" flexgap="1em">
                  <CardAbilityIcon cardAbility={abilityType} />
                  <AbilityName>{abilityName}</AbilityName>
                </AbilityTypeContainer>
                <AbilityDesc>{text}</AbilityDesc>
              </Fragment>
            ))}
          </Box>
        )}
        {attacks?.length > 0 && (
          <Box flexalign="flex-start" flexgap="0.5em">
            <SectionSubTitle>Attacks</SectionSubTitle>
            <AttackTable>
              <tbody>
                {attacks.map(({ cost, damage, text, name: attackName }, i) => (
                  <Fragment key={`${name}-${attackName}-${id}-${i}`}>
                    <tr>
                      <AttackCostContainer>
                        {cost.map((costEnergy, i) => (
                          <CardIcon
                            key={`${id}-${costEnergy}-cost-${attackName}-${i}`}
                            alt={`${attackName} ${costEnergy} icon`}
                            cardType={costEnergy}
                          />
                        ))}
                      </AttackCostContainer>
                      <td colSpan={damage ? 2 : 1}>
                        <AttackName>{attackName}</AttackName>
                      </td>
                      <td>
                        <AttackName>{damage}</AttackName>
                      </td>
                    </tr>
                    {text && (
                      <AttackDescRow>
                        <AttackDesc colSpan={3}>{text}</AttackDesc>
                      </AttackDescRow>
                    )}
                  </Fragment>
                ))}
              </tbody>
            </AttackTable>
          </Box>
        )}
        <CardDivider />
      </BoxWrapper>
    </AnimatePresence>
  );
};

export default CardDetails;
