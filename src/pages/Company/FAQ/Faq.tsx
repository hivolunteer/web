import { useState } from "react";
import { Accordion, AccordionSummary, AccordionDetails, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import "./Faq.scss";

function FAQ() {
    const faqs = [
        {
            page: "Page d'accueil",
            questions: [
                {
                    question: "Que faire si je rencontre un problème pour naviguer sur la page d'accueil ?",
                    answer: "Si vous rencontrez des difficultés, essayez de rafraîchir la page ou de vérifier votre connexion Internet. Si le problème persiste, envoyez nous un email."
                },
                {
                    question: "Comment puis-je rechercher une mission ou une association depuis la page d'accueil ?",
                    answer: "Utilisez la barre de recherche en haut de la page pour entrer des mots-clés liés à la mission ou à l'association que vous recherchez."
                },
                {
                    question: "Comment puis-je activer le mode daltonien ?",
                    answer: "Pour personnaliser l'affichage, allez dans 'Réglages' en cliquant sur votre photo de profil sur la droite de la barre de navigation. Cliquez sur le bouton 'Activer le mode daltonien'."
                },
                {
                    question: "Comment rechercher une mission ?",
                    answer: "Utilisez la barre de recherche en haut de la page pour rechercher une mission par son nom ou ses critères. La recherche est effectuée en temps réel au fur et à mesure de la saisie."
                },
                {
                    question: "Que signifient les différentes catégories de missions ?",
                    answer: "Les missions sont classées en trois catégories : 'En attente de validation' (missions qui attendent une approbation), 'Publiées' (missions activées et ouvertes), et 'Passées' (missions terminées)."
                },
                {
                    question: "Comment puis-je filtrer les missions par statut ?",
                    answer: "Vous pouvez filtrer les missions par statut en utilisant les onglets situés en haut de la page. Sélectionnez l'onglet correspondant au statut de mission que vous souhaitez consulter : 'En attente de validation', 'Publiées' ou 'Passées'."
                },
                {
                    question: "Que faire si aucune mission n'apparaît dans une catégorie ?",
                    answer: "Si aucune mission n'apparaît dans une catégorie, cela signifie qu'il n'y a pas de missions dans ce statut pour le moment. Vérifiez les autres onglets pour d'autres missions disponibles."
                },
                {
                    question: "Comment modifier ou gérer une mission ?",
                    answer: "Cliquer sur la carte de mission pour pouvoir visualiser la mission ou la modifier."
                }
            ]
        },
        {
            page: "Mes équipes",
            questions: [
                {
                    question: "Que faire si le chargement des membres prend du temps ?",
                    answer: "Si le chargement des membres prend plus de temps que prévu, cela peut être dû à une connexion lente ou à un grand nombre de membres à récupérer. Vous pouvez essayer de rafraîchir la page."
                },
                {
                    question: "Pourquoi n'y a-t-il pas de membres dans l'équipe ?",
                    answer: "Si aucun membre n'apparaît dans l'équipe, cela signifie qu'il n'y a actuellement pas de membres associés à cette équipe. Vous pouvez vérifier plus tard ou contacter l'administrateur pour plus d'informations."
                },
                {
                    question: "Que signifie l'icône de l'abeille et le nombre à côté ?",
                    answer: "L'icône de l'abeille représente le total des 'Bee' attribués à l'équipe. Ce nombre reflète l'activité ou les contributions spécifiques de l'équipe dans le système."
                },
                {
                    question: "Comment voir les membres d'une équipe ?",
                    answer: "Pour voir les membres d'une équipe, cliquez sur le bouton 'Voir les membres' qui apparaît sous la description de l'équipe. Une fenêtre modale s'ouvrira avec la liste des membres de l'équipe."
                },
                {
                    question: "Que faire si les membres de l'équipe ne s'affichent pas ?",
                    answer: "Si les membres de l'équipe ne s'affichent pas après avoir cliqué sur 'Voir les membres', cela peut être dû à une erreur de chargement ou à un problème de connexion. Essayez de réessayer plus tard ou contactez l'assistance."
                }
            ]
        },
        {
            page: "AffiliatedAssociations",
            questions: [
                {
                    question: "Que faire si aucune association affiliée n'apparaît ?",
                    answer: "Si aucune association affiliée n'apparaît, cela signifie qu'aucune association n'a été ajoutée à votre compte. Vous pouvez vérifier plus tard ou contacter l'administrateur pour obtenir de l'aide."
                },
                {
                    question: "Comment supprimer une association affiliée ?",
                    answer: "Pour supprimer une association affiliée, cliquez sur l'icône de la corbeille à côté de l'association que vous souhaitez supprimer. Une fenêtre de confirmation apparaîtra pour vous assurer que vous souhaitez vraiment supprimer cette association."
                },
                {
                    question: "Que se passe-t-il si je supprime une association affiliée ?",
                    answer: "Si vous supprimez une association affiliée, elle sera retirée de votre liste d'associations affiliées. Cette action est irréversible, alors assurez-vous d'avoir pris la bonne décision avant de confirmer."
                },
                {
                    question: "Que signifie le score 'Bee' associé à chaque association ?",
                    answer: "Le score 'Bee' représente l'activité ou l'engagement de l'association. Plus le score est élevé, plus l'association est active dans le système."
                }
            ]
        },             
        {
            page: "Profil",
            questions: [
                {
                    question: "Comment modifier mes informations de profil ?",
                    answer: "Rendez-vous dans les Réglages, puis cliquez sur le bouton 'Informations de profil'. Modifiez les champs nécessaires et sauvegardez les modifications en utilisant le bouton 'Sauvegarder les changements'."
                },
                {
                    question: "Comment supprimer mon compte ?",
                    answer: "Rendez-vous dans les réglages, puis appuyez sur le bouton 'Supprimer le compte'. Confirmez l'action pour supprimer définitivement votre compte."
                }
            ]
        }                        
    ];

    return (
        <div className="page-container">
            <Typography variant="h4" sx={{ marginBottom: "50px" }} gutterBottom>
                Foire aux Questions
            </Typography>
            {faqs.map((faqSection, index) => (
                <div key={index}>
                    <Typography variant="h5" sx={{ marginBottom: "20px", marginTop: "20px" }}>
                        {faqSection.page}
                    </Typography>
                    {faqSection.questions.map((faq, idx) => (
                        <Accordion key={idx}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls={`faq-content-${idx}`}
                                id={`faq-header-${idx}`}
                            >
                                <Typography variant="body1">{faq.question}</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography variant="body2">{faq.answer}</Typography>
                            </AccordionDetails>
                        </Accordion>
                    ))}
                </div>
            ))}
        </div>
    );
}

export default FAQ;
