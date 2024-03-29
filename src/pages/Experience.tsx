import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import styled from '@emotion/styled';
import { Section, SectionTitle } from './Profile';
import { fadeInRight, animationContainer } from '../animations/variants';
import { indeedDetails, arsagaDetails } from '../data';

interface ExperienceComponentProps {
    companyIcon: {
        src: string;
        alt: string;
    }
    mainDescription: {
        companyName: string;
        companyLink: string;
        positionName: string;
        experienceDate: string;
    }
    roles: string[];
    skills: string[];
}

const ExperienceComponent: React.FC<ExperienceComponentProps> = ({ companyIcon, mainDescription, roles, skills }) => {
    return (
    <Card variants={fadeInRight}>
        <IconMainDescriptionWrapper>
            <CompanyIcon src={companyIcon.src} alt={companyIcon.alt} />
            <MainDescription>
                <CompanyName
                    target="_blank"
                    rel="noopener noreferrer"
                    href={mainDescription.companyLink}
                >
                    {mainDescription.companyName}
                </CompanyName>
                <PositionName>{mainDescription.positionName}</PositionName>
                <ExperienceDate>{mainDescription.experienceDate}</ExperienceDate>
            </MainDescription>
        </IconMainDescriptionWrapper>
        <RolesSkillsWrapper>
            <DescriptionTitle>Roles:</DescriptionTitle>
            <RolesWrapper>
                {roles.map((role) => {
                    return (<Role>{role}</Role>);
                })}
            </RolesWrapper>
            <DescriptionTitle>Skills:</DescriptionTitle>
            <SkillsWrapper>
                {skills.map((skill) => {
                    return (<Skill>{skill}</Skill>);
                })}
            </SkillsWrapper>
        </RolesSkillsWrapper>
    </Card>
    );
}

export const Experience: React.FC = () => {
    const experienceList = [indeedDetails, arsagaDetails];
    const controls = useAnimation();
    const [ref, inView] = useInView({
        threshold: [0.25],
        triggerOnce: true
    });
    useEffect(() => {
        if (inView) {
        controls.start("visible");
        } else {
        controls.start("hidden");
        }
    }, [controls, inView]);

    return (
    <Section
      id="experience"
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={animationContainer}
    >
        <SectionTitle variants={fadeInRight}>Experience</SectionTitle>
        <Wrapper>
            {experienceList.map((experience) => {
                return (<ExperienceComponent {...experience}/>);
            })}
        </Wrapper>
    </Section>
    );
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 25px;
    letter-spacing: 0.7px;
`;

const CompanyIcon = styled.img`
    width: 70px;
    height: 70px;
`;

const Card = styled(motion.div)`
    margin-bottom: 24px;
    padding: 20px;
    background: rgba(255, 255, 255, 0.5);
    box-shadow: 0 0.75vw 2vw 0 rgba(0, 0, 0, 0.1);
    border-radius: 22px;
    border: 1px solid rgba(255, 255, 255, 0.125);
`;

const CompanyName = styled.a`
    color: var(--primary-blue);
    cursor: pointer;
    font-weight: 700;
    text-decoration: none;
    &:hover {
        text-decoration: underline;
    }
`;

const PositionName = styled.span`
`;

const ExperienceDate = styled.span`
    color: var(--dark-gray-text-color);
    font-size: 14px;
    font-weight: 600;
`;

const MainDescription = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin: 4.5px 14.5px;
    font-size: 15px;
`;

const IconMainDescriptionWrapper = styled.div`
    display: flex;
`;

const RolesWrapper = styled.ul`
    margin-block-start: 0;
    margin-block-end: 0;
    font-size: 15px;
    font-weight: 300;
`;

const Role = styled.li`
    margin: 3px 0;
`;

const DescriptionTitle = styled.span`
    font-size: 15px;
    font-weight: 600;
    margin-top: 9px;
    margin-bottom: 4px;
`;

const RolesSkillsWrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 5px;
`;

const SkillsWrapper = styled.div`
    display: inline-block;
    letter-spacing: 0;
`;

const Skill = styled.span`
    display: inline-block;
    background-color: rgba(255, 255, 255, 0.5);
    font-size: 14.5px;
    border-radius: 15px;
    padding: 3px 7px;
    margin-right: 3.5px;
    margin-top: 3px;
    margin-bottom: 5px;
    border: 1px solid var(--dark-gray-text-color);
`;