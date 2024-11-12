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
                }
            ]
        },
        {
            page: "Recherche",
            questions: [
                {
                    question: "Comment puis-je rechercher des associations/bénévoles/missions ?",
                    answer: "Utilisez la barre de recherche pour trouver des résultats spécifiques. Vous pouvez affiner votre recherche par nom ou localisation pour des résultats plus pertinents ou utiliser les filtres en cliquant sur 'Afficher les filtres'."
                },
                {
                    question: "Comment basculer entre la recherche de missions, d'associations et de bénévoles ?",
                    answer: "Utilisez les onglets en haut de la page pour basculer entre les différentes sections et afficher les missions, associations ou bénévoles disponibles."
                },
                {
                    question: "Comment voir les détails d'une mission ?",
                    answer: "Cliquez sur la carte dans la liste pour ouvrir la page de détail et consulter les informations plus précises."
                },
                {
                    question: "Comment savoir si je suis déjà abonné à une association ?",
                    answer: "Si vous êtes abonné, l'icône du bouton de suivi apparaît sous forme de cœur plein. Sinon, il apparaît en contour vide."
                },
                {
                    question: "Comment suivre ou ne plus suivre une association ?",
                    answer: "Pour suivre une association, cliquez sur l'icône en forme de cœur. Pour ne plus la suivre, cliquez à nouveau sur le cœur plein. Cela mettra à jour votre statut de suivi."
                },
                {
                    question: "Comment consulter plus de détails sur une association ?",
                    answer: "Cliquez sur 'Voir plus' en bas de la carte de l'association. Cela vous redirigera vers la page de profil complète de l'association."
                },
                {
                    question: "Comment afficher le profil complet d'un volontaire ?",
                    answer: "Pour voir le profil complet d'un volontaire, cliquez sur le bouton 'Voir le profil' en bas de la carte du volontaire."
                },
                {
                    question: "Pourquoi certains volontaires n'ont-ils pas de photo de profil ?",
                    answer: "Si le volontaire n'a pas ajouté de photo de profil, une image par défaut est affichée à la place."
                },
                {
                    question: "Puis-je contacter un volontaire directement depuis la carte de profil ?",
                    answer: "Oui, l'adresse e-mail du volontaire est affichée sur sa carte de profil, ce qui vous permet de le contacter facilement."
                }
            ]
          },
          {
            page: "Mes Missions (missions que j'ai créé)",
            questions: [
                {
                    question: "Comment puis-je rechercher une mission spécifique ?",
                    answer: "Utilisez la barre de recherche située en haut de la page et tapez un mot-clé pour filtrer les missions en fonction de votre recherche."
                },
                {
                    question: "Quelle est la différence entre les 'Missions publiées' et les 'Missions passées' ?",
                    answer: "Les 'Missions publiées' sont celles qui sont actuellement actives ou à venir, tandis que les 'Missions passées' sont les missions qui se sont déjà terminées."
                },
                {
                    question: "Comment changer de vue entre les missions publiées et les missions passées ?",
                    answer: "Cliquez sur l'onglet correspondant en haut de la page pour basculer entre les 'Missions publiées' et les 'Missions passées'."
                },
                {
                    question: "Que faire si aucune mission n'est affichée dans l'un des onglets ?",
                    answer: "Si aucune mission n'est affichée, cela signifie que vous n'avez actuellement aucune mission créée."
                }
            ]
          },
          {
            page: "Historique de participation (missions sur lesquelles vous vous êtes inscrit)",
            questions: [
                {
                    question: "Comment puis-je voir les missions actives et passées ?",
                    answer: "Sur cette page, vous pouvez voir toutes vos missions, divisées en catégories 'Actives' et 'Passées'."
                },
                {
                    question: "Quelle est la différence entre les missions 'Actives' et 'Passées' ?",
                    answer: "Les missions 'Actives' sont celles qui sont actuellement en cours, tandis que les missions 'Passées' sont celles qui sont terminées."
                },
                {
                    question: "Comment basculer entre les missions actives et passées ?",
                    answer: "Utilisez les onglets en haut de la page pour afficher soit les missions 'Actives', soit les missions 'Passées'."
                },
                {
                    question: "Pourquoi certaines missions n'apparaissent pas dans l'onglet 'Actives' ou 'Passées' ?",
                    answer: "Si un onglet est vide, cela signifie que vous n'avez actuellement aucune mission dans cette catégorie."
                }
            ]
        },        
        {
            page: "Missions assignées (missions sur lesquelles vous êtes référent pour una association)",
            questions: [
                {
                    question: "Comment puis-je voir l'historique des missions pour lesquelles je suis référent ?",
                    answer: "Sur cette page, vous trouverez un historique de toutes les missions pour lesquelles vous êtes référent, divisées en catégories 'En cours' et 'Passées'."
                },
                {
                    question: "Quelle est la différence entre les missions 'En cours' et 'Passées' ?",
                    answer: "Les missions 'En cours' sont celles qui se déroulent actuellement, tandis que les missions 'Passées' sont celles qui sont déjà terminées."
                },
                {
                    question: "Comment changer de vue entre les missions en cours et les missions passées ?",
                    answer: "Utilisez les onglets situés en haut de la liste pour basculer entre les missions 'En cours' et 'Passées'."
                },
                {
                    question: "Que faire si aucune mission n'est affichée dans l'un des onglets ?",
                    answer: "Si aucun historique de mission n'est affiché dans un onglet, cela signifie qu'il n'y a actuellement aucune mission dans cette catégorie."
                }
            ]
        },
        {
            page: "Profil",
            questions: [
                {
                    question: "Que puis-je voir sur la page de profil ?",
                    answer: "Sur cette page, vous pouvez voir les informations principales du profil, notamment la photo, le nom, les statistiques de missions, les compétences, et la liste d'amis."
                },
                {
                    question: "Comment voir mes amis sur cette page ?",
                    answer: "La section 'Amis' affiche une liste de vos amis bénévoles. Cliquez sur leur nom pour voir leurs profils."
                },
                {
                    question: "Comment ajouter/supprimer/bloquer des bénévoles ?",
                    answer: "Sur le profil du bénévole cliquer sur Ajouter/Retirer/Bloquer le bénévole en question."
                },
                {
                    question: "Comment puis-je gérer les utilisateurs bloqués ?",
                    answer: "Utilisez le bouton 'Gérer les utilisateurs Bloqués' pour accéder à la gestion des utilisateurs bloqués et les débloquer si nécessaire."
                },
                {
                    question: "Comment modifier mes informations de profil ?",
                    answer: "Rendez-vous dans les Réglages, puis cliquez sur le bouton 'Informations de profil'. Modifiez les champs nécessaires et sauvegardez les modifications en utilisant le bouton 'Sauvegarder les changements'."
                },
                {
                    question: "Comment supprimer mon compte ?",
                    answer: "Rendez-vous dans les réglages, puis appuyez sur le bouton 'Supprimer le compte'. Confirmez l'action pour supprimer définitivement votre compte."
                }
            ]
        },
        {
            page: "Devenir référent pour une association",
            questions: [
                {
                    question: "Comment devenir référent pour une association ?",
                    answer: "Pour devenir référent, saisissez le code de référent fourni par l'association dans le champ 'Code de référent' et cliquez sur 'Valider'."
                },
                {
                    question: "Comment dissocier une association ?",
                    answer: "Dans la section 'Liste des associations', cliquez sur l'association que vous souhaitez dissocier. Une fois dissocié, vous ne serez plus référent pour cette association."
                },
                {
                    question: "Que se passe-t-il si je me dissocie d'une association ?",
                    answer: "Si vous vous dissociez d'une association, vous ne serez plus référent pour cette dernière et les missions sur lesquelles vous êtes référent vous seront retirées."
                },
                {
                    question: "Pourquoi mon code de référent ne fonctionne-t-il pas ?",
                    answer: "Si le code de référent est incorrect ou expiré, un message d'erreur s'affichera. Assurez-vous que le code est valide ou contactez l'association pour obtenir un nouveau code."
                },
                {
                    question: "Que signifie être référent pour une association ?",
                    answer: "En tant que référent, vous êtes responsable de certaines missions et activités pour l'association à laquelle vous êtes affilié. Cela vous permet de gérer certaines opérations pour l'association."
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
