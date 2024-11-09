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
            page: "Mes Missions",
            questions: [
                {
                    question: "Comment puis-je créer une mission ?",
                    answer: "Pour créer une mission, cliquez sur le bouton 'Créer une mission' sur la page d'accueil, remplissez les détails, puis soumettez. Elle apparaîtra dans 'Mes Missions' une fois validée."
                },
                {
                    question: "Comment rechercher des missions ?",
                    answer: "Utilisez la barre de recherche en haut de la page 'Mes Missions' ou la page d'accueil. Tapez des mots-clés liés à la mission que vous recherchez."
                },
                {
                    question: "Que signifient les statuts des missions ?",
                    answer: "'Brouillon' signifie une mission qui n'est pas encore publiée et que vous pouvez encore modifier, 'Publiée' signifie une mission en ligne que les bénévoles peuvent voir, 'Passée' désigne une mission passée et 'Annulée' une mission annulée."
                },
                {
                    question: "Comment filtrer les missions ?",
                    answer: "Utilisez les onglets pour filtrer les missions par statut. Sélectionnez un onglet pour afficher uniquement les missions dans cette catégorie spécifique."
                },
                {
                    question: "Que signifient les missions en jaune ?",
                    answer: "Les missions en jaune sont les missions du jour."
                },
                {
                    question: "Comment afficher les détails d'une mission ?",
                    answer: "Cliquez sur une carte de mission pour voir plus de détails, y compris les horaires et le lieu."
                },
                {
                    question: "Comment puis-je modifier/annuler/supprimer une mission ?",
                    answer: "Cliquez sur une carte de mission pour voir plus de détails. Cliquez sur le bouton modifier/annuler/supprimer pour mettre à jour, annuler ou supprimer la mission."
                }
            ]
        },
        {
            page: "Création de Mission",
            questions: [
                {
                    question: "Que dois-je fournir pour créer une mission ?",
                    answer: "Pour créer une mission, vous devez fournir des informations telles que le nom de la mission, une description, des informations pratiques, le nombre de bénévoles requis, le lieu, les dates, les compétences et les référents. Vous pouvez également ajouter une image pour la mission."
                },
                {
                    question: "Comment ajouter une adresse pour ma mission ?",
                    answer: "Vous pouvez ajouter une adresse en cliquant sur le bouton 'Ajouter une adresse'. Cela ouvrira une fenêtre modale où vous pourrez entrer les détails de l'adresse, y compris le nom de la rue, le numéro, la ville et le code postal ou choisir une adresse existante."
                },
                {
                    question: "Puis-je ajouter plusieurs plages de dates pour une mission ?",
                    answer: "Oui, vous pouvez ajouter plusieurs plages horaires pour votre mission en cliquant sur 'Ajouter une nouvelle plage horaire'. Vous pourrez spécifier la date de début et la date de fin pour chaque plage. Vous pouvez aussi supprimer une plage en cliquant sur 'Supprimer'."
                },
                {
                    question: "Comment ajouter des compétences à ma mission ?",
                    answer: "Vous pouvez ajouter des compétences en utilisant le champ 'Compétences'. Sélectionnez les compétences requises pour la mission dans le menu déroulant. Vous pouvez sélectionner plusieurs compétences si nécessaire."
                },
                {
                    question: "Qu'est-ce qu'un référent, et comment en ajouter un à ma mission ?",
                    answer: "Un référent est une personne qui supervise la mission. Vous pouvez ajouter un référent en cliquant sur 'Ajouter un référent' et en choisisant un référent dans la liste de référents disponibles."
                }
            ]
        },
        {
            page: "Commentaires et Évaluations de Mission",
            questions: [
                {
                    question: "Où puis-je voir les évaluations et les commentaires pour une mission ?",
                    answer: "Vous pouvez consulter les évaluations et les commentaires sous la section 'Notes et Commentaires' de la mission dans les détails d'une mission. La note moyenne et les commentaires de tous les participants sont affichés ici."
                },
                {
                    question: "Comment la note moyenne est-elle calculée pour une mission ?",
                    answer: "La note moyenne est calculée en fonction des évaluations de tous les participants ayant commenté la mission. Elle est mise à jour automatiquement dès qu'un nouveau commentaire est ajouté."
                }
            ]
        },
        {
            page: "Calendrier",
            questions: [
                {
                    question: "Comment ajouter un événement à mon calendrier ?",
                    answer: "Pour ajouter un événement, cliquez sur le bouton 'Ajouter un événement' sur votre page de calendrier. Remplissez les informations demandées telles que le titre, la date, l'heure et les catégories, puis enregistrez l'événement."
                },
                {
                    question: "Puis-je voir mes événements dans différentes vues (jour, semaine, mois) ?",
                    answer: "Oui, vous pouvez basculer entre différentes vues de votre calendrier (jour, semaine, mois) en utilisant les options de navigation en haut du calendrier. Cela vous permet de mieux organiser et visualiser vos événements selon vos préférences."
                },
                {
                    question: "Comment modifier un événement existant ?",
                    answer: "Pour modifier un événement, cliquez sur l'événement dans votre calendrier, puis sélectionnez l'option 'Modifier'. Vous pourrez alors ajuster les informations de l'événement telles que la date, l'heure, les catégories ou la description."
                },
                {
                    question: "Puis-je supprimer un événement de mon calendrier ?",
                    answer: "Oui, vous pouvez supprimer un événement en cliquant dessus pour ouvrir les détails, puis en sélectionnant l'option 'Supprimer l'événement'. Cela retirera l'événement de votre calendrier de manière permanente."
                },
                {
                    question: "Comment ajouter une nouvelle catégorie pour mes événements ?",
                    answer: "Pour ajouter une catégorie, ouvrez la fenêtre modale 'Ajouter une catégorie'. Choisissez un titre et une couleur pour la catégorie, puis cliquez sur 'Ajouter'. La nouvelle catégorie apparaîtra dans la liste des catégories disponibles."
                },
                {
                    question: "Puis-je voir mes missions dans le calendrier ?",
                    answer: "Oui, vous pouvez voir vos différentes missions dans le calendrier."
                }
            ]
        },   
        {
            page: "Entreprises Affiliées",
            questions: [
                {
                    question: "Comment puis-je lier mon association à une entreprise ?",
                    answer: "Vous devez générer un code référent via l'option disponible sur la page 'Entreprises affiliées'. Ce code peut ensuite être partagé avec l'entreprise pour l'affiliation."
                },
                {
                    question: "Comment obtenir un code référent pour l'entreprise ?",
                    answer: "Si vous n'avez pas de code, vous pouvez en générer un en cliquant sur le bouton 'Générer un code référent'."
                },
                {
                    question: "Que faire si l'entreprise a déjà un code référent ?",
                    answer: "Si un code est déjà généré, vous pouvez le copier ou le modifier à tout moment. Vous avez également la possibilité de supprimer le code ou de réinitialiser la clé."
                },
                {
                    question: "Que faire si je veux supprimer l'affiliation d'une entreprise ?",
                    answer: "Vous pouvez supprimer une entreprise affiliée en cliquant sur l'icône de suppression à côté de l'entreprise. Assurez-vous que vous souhaitez effectuer cette action, car elle est irréversible."
                },
                {
                    question: "Comment puis-je visualiser les entreprises affiliées à mon association ?",
                    answer: "La liste des entreprises affiliées est affichée sous la section 'Entreprises affiliées'. Si aucune entreprise n'est affichée, cela signifie qu'aucune entreprise n'est encore affiliée."
                }
            ]
        },
        {
            page: "Profil",
            questions: [
                {
                    question: "Comment mettre à jour mes informations personnelles ?",
                    answer: "Pour mettre à jour vos informations personnelles, allez dans votre profil, puis cliquez sur l'option 'Modifier'. Vous pourrez alors modifier vos informations telles que votre nom, adresse e-mail, numéro de téléphone, et d'autres détails."
                },
                {
                    question: "Puis-je changer ma photo de profil ?",
                    answer: "Oui, vous pouvez changer votre photo de profil en cliquant sur l'icône de votre photo actuelle dans votre profil. Sélectionnez ensuite une nouvelle image depuis votre appareil."
                },
                {
                    question: "Comment gérer mes missions actuelles depuis mon profil ?",
                    answer: "Depuis votre profil, vous pouvez consulter toutes vos missions en cours et passées. Pour chaque mission, vous pouvez voir les détails, mettre à jour vos informations, ou annuler votre participation si nécessaire."
                },
                {
                    question: "Est-ce que je peux ajouter une biographie ou une description de mes compétences ?",
                    answer: "Oui, vous pouvez ajouter une biographie ou une description de vos compétences dans la section 'À propos de moi' de votre profil. Cela permet aux recruteurs ou aux associations de mieux vous connaître."
                },
                {
                    question: "Comment supprimer mon compte ?",
                    answer: "Si vous souhaitez supprimer votre compte, allez dans les paramètres de votre profil et sélectionnez l'option 'Supprimer mon compte'. Vous serez invité à confirmer cette action avant qu'elle ne soit effectuée."
                },
                {
                    question: "Puis-je partager mon profil avec des associations ou des recruteurs ?",
                    answer: "Oui, vous pouvez partager votre profil en envoyant le lien de votre page de profil à des associations ou recruteurs. Vous pouvez également choisir de rendre certaines informations visibles ou privées."
                },
                {
                    question: "Comment puis-je modifier les informations de mon profil externe ?",
                    answer: "Pour modifier votre profil externe, connectez-vous à votre compte, accédez à la section 'Profil' et mettez à jour les informations nécessaires. Les modifications seront immédiatement visibles sur votre profil public."
                },
                {
                    question: "Est-ce que les autres utilisateurs peuvent voir mon profil externe ?",
                    answer: "Oui, votre profil externe est public et accessible aux autres utilisateurs de la plateforme."
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
